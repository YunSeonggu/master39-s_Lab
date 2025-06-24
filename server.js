const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 환경 변수에서 API 키 가져오기
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

// 네이버 블로그 검색 API
app.get('/api/naver-blog', async (req, res) => {
    try {
        const { keyword } = req.query;
        
        if (!keyword) {
            return res.status(400).json({ error: '키워드가 필요합니다.' });
        }

        const fetch = (await import('node-fetch')).default;
        const url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(keyword)}&display=30&start=1&sort=sim`;
        
        const response = await fetch(url, {
            headers: {
                'X-Naver-Client-Id': NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
            }
        });

        if (!response.ok) {
            throw new Error(`네이버 API 오류: ${response.status}`);
        }

        const data = await response.json();
        const titles = data.items.map(item => 
            item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')
        );

        res.json({ titles });
    } catch (error) {
        console.error('네이버 블로그 검색 오류:', error);
        res.status(500).json({ error: '네이버 블로그 검색 중 오류가 발생했습니다.' });
    }
});

// GPT 제목 분석 API
app.post('/api/analyze-titles', async (req, res) => {
    try {
        // API 키 체크
        if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
            return res.status(500).json({ 
                error: 'OpenAI API 키가 설정되지 않았습니다. .env 파일에 OPENAI_API_KEY를 설정해주세요.' 
            });
        }

        const { titles } = req.body;
        
        if (!titles || !Array.isArray(titles)) {
            return res.status(400).json({ error: '제목 배열이 필요합니다.' });
        }

        const fetch = (await import('node-fetch')).default;
        
        const prompt = `아래는 네이버 블로그에서 수집한 30개의 블로그 글 제목입니다. 이 제목들을 다음 기준에 따라 심층적으로 분석해 주세요.

분석 결과는 반드시 아래와 같은 JSON 형식의 문자열로만 출력해 주세요.
{
  "structure": "제목의 구조적 특징 ...",
  "keywords": "핵심 키워드 ...",
  "pattern": "제목 구성 패턴 ...",
  "interest": "독자 관심 유발 기법 ...",
  "seo": "SEO 최적화 특징 ...",
  "title1": "새로 생성된 블로그 제목 1",
  "title2": "새로 생성된 블로그 제목 2",
  ...
  "title10": "새로 생성된 블로그 제목 10"
}

아래 기준에 따라 분석해 주세요.
1. 제목의 구조적 특징(예: 문장 길이, 구문, 반복되는 포맷 등)을 구체적으로 설명해 주세요.
2. 제목에서 자주 등장하는 핵심 키워드와 그 이유를 정리해 주세요.
3. 제목들이 공통적으로 가지는 제목 구성 패턴(예: [키워드] + [경험/후기], [질문] + [해결책] 등)을 구체적으로 설명해 주세요.
4. 독자의 관심을 유발하기 위해 사용된 기법(예: 숫자 사용, 질문, 감정 자극, 긴급성 등)을 분석해 주세요.
5. SEO(검색엔진최적화) 관점에서 제목들이 가지는 특징(예: 키워드 배치, 검색량 높은 단어 사용, 구체성 등)을 설명해 주세요.
6. 위 분석을 바탕으로, 같은 주제로 새로운 블로그 글 제목 10개를 창의적으로 제안해 주세요. (다양한 형태와 구조를 반영해 주세요)

블로그 제목 목록:
${titles.map((title, index) => `${index + 1}. ${title}`).join('\n')}`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: '당신은 블로그 마케팅 및 SEO 전문가입니다.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 1500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API 오류: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // JSON 추출 시도
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                const result = JSON.parse(jsonMatch[0]);
                res.json(result);
            } catch (parseError) {
                res.json({ error: 'JSON 파싱 실패', content });
            }
        } else {
            res.json({ error: 'JSON 형식을 찾을 수 없음', content });
        }

    } catch (error) {
        console.error('GPT 분석 오류:', error);
        console.error('오류 상세:', error.message);
        console.error('API 키 앞 4자리:', OPENAI_API_KEY ? OPENAI_API_KEY.substring(0, 4) : 'null');
        res.status(500).json({ 
            error: 'GPT 분석 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

// GPT 블로그 글 생성 API
app.post('/api/generate-blog', async (req, res) => {
    try {
        // API 키 체크
        if (!OPENAI_API_KEY || OPENAI_API_KEY === 'your_openai_api_key_here') {
            return res.status(500).json({ 
                error: 'OpenAI API 키가 설정되지 않았습니다. .env 파일에 OPENAI_API_KEY를 설정해주세요.' 
            });
        }

        const { title, model = 'gpt-4o', minChars = 1000, maxChars = 1500 } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: '제목이 필요합니다.' });
        }

        const fetch = (await import('node-fetch')).default;
        
        const prompt = `아래는 블로그 글 제목입니다. 이 제목에 어울리는 블로그 글을 ${minChars}~${maxChars}자 내외로 작성해 주세요. 
- 실제 블로그처럼 친근하고 유익하게, 정보와 경험을 적절히 섞어 작성해 주세요.
- SEO를 고려해 제목과 관련된 키워드를 자연스럽게 본문에 녹여 주세요.
- 문단 구분, 소제목, 리스트 등 가독성을 높이는 요소를 활용해 주세요.

블로그 글 제목: ${title}`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: '당신은 블로그 글쓰기 전문가입니다.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API 오류: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        res.json({ content });

    } catch (error) {
        console.error('블로그 글 생성 오류:', error);
        console.error('오류 상세:', error.message);
        res.status(500).json({ 
            error: '블로그 글 생성 중 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

// API 라우트
app.post('/api/openai', async (req, res) => {
    try {
        const { messages, model = 'gpt-4o', max_tokens = 2000 } = req.body;
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model,
                messages,
                max_tokens,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API 오류: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('OpenAI API 호출 오류:', error);
        res.status(500).json({ error: 'API 호출 중 오류가 발생했습니다.' });
    }
});

// 메인 페이지 서빙
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    console.log('OpenAI API 키 설정됨:', OPENAI_API_KEY ? '✅' : '❌');
    console.log('네이버 API 키 설정됨:', NAVER_CLIENT_ID ? '✅' : '❌');
}); 