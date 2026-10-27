export type Article = {id:string;language:'ko'|'en';category:string;title:string;subtitle:string;minutes:number;concept:string;paragraphs:string[];translation?:string[];vocabulary:{term:string;meaning:string;example:string}[];questions?:{question:string;options:string[];answer:number;explanation:string}[];prompt:string;sources:{name:string;url:string}[]};
export const articles: Article[] = [
{
id:'ko-qr',language:'ko',category:'기술 · 일상 속 원리',title:'QR코드는 왜 일부가 가려져도 읽힐까?',subtitle:'완벽하게 보관하는 대신, 잃어버린 부분을 복원한다.',minutes:7,concept:'정보의 중복성과 오류 정정',
paragraphs:[
'카페의 메뉴판에 인쇄된 QR코드가 조금 긁혀 있어도 휴대전화는 주소를 찾아낸다. 가운데에 작은 로고가 들어간 코드도 종종 잘 읽힌다. 모든 검은 칸에 꼭 필요한 정보가 담겨 있다면, 일부가 사라진 순간 전체를 읽을 수 없어야 할 것 같다. 그런데 QR코드는 정보가 온전히 남아 있다는 가정에만 기대지 않는다. 손상을 어느 정도 견딜 수 있도록 처음부터 설계되어 있다.',
'핵심은 오류 정정이다. 원래 전달하려던 데이터에, 그 데이터를 복원하는 데 쓸 추가 정보를 함께 담는다. 이 추가 정보는 원본을 통째로 여러 번 복사한 것과는 다르다. 여러 부분 사이에 수학적인 관계를 만들어 두고, 읽어 낸 결과가 그 관계에 맞는지 확인하는 방식에 가깝다. QR코드는 이를 위해 리드–솔로몬 부호라는 방법을 사용한다.',
'간단한 비유를 생각해 보자. 종이에 세 수와 그 합을 적어 두었다고 하자. 세 수 가운데 하나가 지워져도 나머지 두 수와 합이 남아 있으면 사라진 수를 계산할 수 있다. 이것이 QR코드의 실제 알고리즘은 아니지만, 복원용 정보가 왜 도움이 되는지는 보여 준다. 원본 바깥에 관계를 남겨 두면, 빈칸을 단순히 짐작하는 대신 남은 정보로 제약을 걸 수 있다.',
'추가 정보는 공짜가 아니다. 같은 크기의 공간에 복원용 데이터를 더 담으면, 원래 내용에 쓸 수 있는 자리는 줄어든다. 같은 내용을 넣으면서 복원 능력을 높이려면 더 큰 코드가 필요할 수도 있다. 정보를 많이 담는 것과 손상을 잘 견디는 것 사이에는 이런 맞바꿈이 생긴다. QR코드의 버전과 오류 정정 수준을 함께 고려하는 이유다.',
'덴소웨이브는 네 가지 오류 정정 수준을 설명한다. 가장 높은 H 수준은 전체 코드워드의 약 30%를 복원할 수 있도록 설계되어 있다. 여기서 주의할 점은 이 수치를 곧바로 이미지 면적의 30%로 바꾸면 안 된다는 것이다. 손상된 위치와 형태, 인식에 필요한 무늬가 남아 있는지에 따라서도 읽기 결과는 달라진다. 아무 곳이나 크게 가려도 된다는 보장은 아니다.',
'프로그램을 만드는 사람에게도 이 원리는 낯설지 않다. 게임 저장 파일을 하나만 두는 것보다 별도의 백업을 두면 실수에 대응하기 쉽다. 다만 백업과 오류 정정은 동일한 기술이 아니다. 둘을 연결하는 생각은, 현실의 실패를 설계에서 미리 고려한다는 데 있다. “절대로 망가지지 않는다”는 기대 대신 “일부가 망가져도 어떤 방법으로 돌아올 것인가”를 묻는다.',
'다음에 QR코드를 스캔할 때는 검은 칸들을 주소의 조각으로만 보지 말자. 그 안에는 주소가 손상될 가능성에 대비한 정보도 있다. 우리가 매끄럽게 쓰는 기술은, 실패가 전혀 없어서 편리한 것이 아닐 때가 많다. 작은 실패를 눈에 띄지 않게 처리하도록 준비되어 있기 때문에 편리하다.'
],
vocabulary:[{term:'오류 정정',meaning:'손상되거나 잘못 읽힌 정보를 추가 데이터로 바로잡는 것',example:'오류 정정 능력을 높이려면 복원용 정보가 더 필요하다.'},{term:'중복성',meaning:'필요 최소한보다 더 많은 정보를 두어 손실에 대비하는 성질',example:'정보의 중복성은 효율을 조금 양보하고 신뢰성을 높인다.'},{term:'제약을 걸다',meaning:'가능한 답이나 행동의 범위를 좁히다',example:'남은 정보가 사라진 값의 범위에 제약을 건다.'}],
prompt:'정보를 조금 더 담는 대신 실패를 견디게 만든 사례를 하나 떠올려 봐.',
sources:[{name:'DENSO WAVE · 오류 정정 기능',url:'https://www.qrcode.com/en/about/error_correction.html'},{name:'DENSO WAVE · 버전과 정보 용량',url:'https://www.qrcode.com/en/about/version.html'}]
},
{
id:'en-average',language:'en',category:'통계 · 생각의 도구',title:'When an average tells the wrong story',subtitle:'숫자가 틀리지 않아도, 비교는 틀릴 수 있다.',minutes:10,concept:'집단 구성과 심슨의 역설',
paragraphs:[
'Imagine that you are choosing between two puzzle games. A review says that players finish Game B more often than Game A. That sounds like a useful measure of difficulty. But before drawing a conclusion, you ask a second question: did the two games attract the same kinds of players?',
'Here is a made-up example. Each game offers easy and hard levels. In Game A, nine of ten players finish an easy level, and thirty of one hundred finish a hard level. Its success rates are therefore ninety percent and thirty percent. In Game B, eighty of one hundred finish an easy level, while two of ten finish a hard level. Its rates are eighty percent and twenty percent.',
'Within both categories, Game A has the higher success rate. However, add the groups together. Game A has thirty-nine successes out of one hundred and ten attempts. Game B has eighty-two successes out of the same number of attempts. The overall rate is about thirty-five percent for A and seventy-five percent for B. The order has reversed.',
'No one changed the numbers. The difference comes from the mixture of attempts. Most players in Game A tried hard levels. Most players in Game B tried easy ones. The overall rates combine performance with the distribution of difficulty. They answer a different question from the rates within each category.',
'This kind of reversal is called Simpson’s paradox. A pattern found in separate groups can reverse when the groups are combined. It is a warning about interpretation, rather than evidence that arithmetic is unreliable. A summary can be correct and still hide information that matters to a decision.',
'For a game developer, the next step would depend on the question. If you want to describe what happened to all players, the overall rate is useful. If you want to compare difficulty for similar attempts, the categories may be more informative. Neither view automatically proves what would happen if the same player switched games. A causal claim needs more than a comparison of percentages.',
'Try writing your own review of these imaginary games. “B had more completed attempts overall” is supported by the example. “B was easier for every kind of player” is not. The second sentence quietly changes the claim. It moves from a result for a mixed population to a claim about individual experience.',
'An average is a compact answer. Before trusting it, make the question equally clear. Ask who is included, how the groups differ, and which comparison you actually need. Learning to read a number means learning to notice the choices behind it.'
],
translation:[
'두 퍼즐 게임 중 하나를 고른다고 상상해 보자. 한 리뷰는 플레이어들이 A보다 B를 더 자주 끝낸다고 말한다. 난이도를 판단하는 데 유용한 지표처럼 들린다. 하지만 결론을 내리기 전에 두 번째 질문을 던져 보자. 두 게임에 모인 플레이어들의 구성이 같았을까?',
'가상의 예를 살펴보자. 두 게임에는 쉬운 단계와 어려운 단계가 있다. A에서는 쉬운 단계에 도전한 10명 중 9명, 어려운 단계에 도전한 100명 중 30명이 성공했다. 성공률은 각각 90%와 30%다. B에서는 쉬운 단계의 100명 중 80명, 어려운 단계의 10명 중 2명이 성공했다. 각각 80%와 20%다.',
'두 범주 모두에서 A의 성공률이 높다. 그러나 집단을 합쳐 보자. A에서는 110번의 시도 중 39번이 성공했다. B에서는 같은 시도 횟수 중 82번이 성공했다. 전체 성공률은 A가 약 35%, B가 약 75%다. 순서가 뒤집혔다.',
'아무도 숫자를 바꾸지 않았다. 차이는 시도의 구성에서 나온다. A의 플레이어 대부분은 어려운 단계에 도전했고, B의 대부분은 쉬운 단계에 도전했다. 전체 성공률에는 성과뿐 아니라 난이도 분포도 섞인다. 따라서 범주별 성공률과는 다른 질문에 답한다.',
'이런 역전을 심슨의 역설이라고 한다. 별개 집단에서 나타난 경향이 집단을 합치면 뒤집힐 수 있다. 이는 산술을 믿을 수 없다는 증거가 아니라 해석에 관한 경고다. 요약은 정확하면서도 결정에 중요한 정보를 가릴 수 있다.',
'게임 개발자가 다음에 할 일은 질문에 따라 달라진다. 모든 플레이어에게 일어난 일을 설명하려면 전체 성공률이 유용하다. 비슷한 조건의 시도에서 난이도를 비교하려면 범주별 결과가 더 많은 정보를 줄 수 있다. 어느 관점도 같은 플레이어가 게임을 바꾸면 어떻게 될지를 저절로 증명하지는 않는다. 인과관계를 주장하려면 백분율 비교 이상의 근거가 필요하다.',
'이 가상 게임의 리뷰를 직접 써 보자. “B에서는 전체적으로 성공한 시도가 더 많았다”는 예시가 뒷받침한다. “B는 모든 종류의 플레이어에게 더 쉬웠다”는 그렇지 않다. 두 번째 문장은 주장을 슬쩍 바꾼다. 혼합된 집단의 결과에서 개인의 경험에 관한 주장으로 넘어간다.',
'평균은 압축된 답이다. 이를 믿기 전에 질문도 그만큼 분명히 하자. 누가 포함되었는지, 집단은 어떻게 다른지, 실제로 필요한 비교는 무엇인지 물어야 한다. 숫자를 읽는 법을 배운다는 것은 그 뒤에 있는 선택을 알아차리는 법을 배우는 것이다.'
],
vocabulary:[{term:'draw a conclusion',meaning:'결론을 내리다',example:'Before drawing a conclusion, check the groups.'},{term:'distribution',meaning:'분포, 구성 비율',example:'The distribution of difficulty affects the overall rate.'},{term:'reverse',meaning:'뒤집히다; 뒤집다',example:'The order has reversed.'},{term:'causal claim',meaning:'인과관계에 관한 주장',example:'A causal claim needs more evidence.'},{term:'informative',meaning:'판단에 도움이 되는 정보를 주는',example:'The categories may be more informative.'}],
questions:[{question:'What makes the overall order reverse?',options:['A mistake in addition','Different mixtures of easy and hard attempts','A change in the number of total attempts','A new rule in Game A'],answer:1,explanation:'A에는 어려운 시도가, B에는 쉬운 시도가 더 많이 포함되어 있다.'},{question:'Which game has a higher success rate in BOTH categories?',options:['Game A','Game B','Neither game','We cannot calculate it'],answer:0,explanation:'쉬운 단계 90% 대 80%, 어려운 단계 30% 대 20%로 A가 둘 다 높다.'},{question:'The overall rate is always useless. True or false?',options:['True','False'],answer:1,explanation:'전체 플레이어에게 실제로 일어난 결과를 설명하려면 유용하다.'},{question:'Which claim is supported by the made-up example?',options:['B is easier for every player','Switching games always improves success','B had more completed attempts overall','Arithmetic is unreliable'],answer:2,explanation:'B는 총 82회, A는 총 39회 성공했다. 개인의 인과 효과까지 증명하지는 않는다.'}],
prompt:'전체 평균을 보기 전에, 어떤 구성 차이를 먼저 확인해야 할까?',
sources:[{name:'Stanford Encyclopedia of Philosophy · Simpson’s Paradox',url:'https://plato.stanford.edu/entries/paradox-simpson/'},{name:'Microsoft · Software Testing Paradoxes',url:'https://learn.microsoft.com/en-us/archive/msdn-magazine/2005/december/test-run-software-testing-paradoxes'}]
},
{
id:'ko-ocean',language:'ko',category:'지구과학 · 증거를 읽는 법',title:'바닷속 돌은 어떻게 지구의 과거를 기억할까?',subtitle:'움직이는 대륙의 증거는, 암석 안에 남아 있었다.',minutes:7,concept:'잔류 자기와 해저 확장',
paragraphs:[
'세계지도를 보면 남아메리카의 동쪽 해안과 아프리카의 서쪽 해안이 어딘가 맞물릴 것처럼 보인다. 그렇다고 모양이 닮았다는 이유만으로 대륙이 움직였다고 단정할 수는 없다. 설득력 있는 설명에는 서로 다른 종류의 증거가 필요하다. 그 가운데 하나는 사람이 쉽게 볼 수 없는 바닷속 암석에 담겨 있었다.',
'해저에는 길게 이어진 산맥인 중앙해령이 있다. 이곳에서는 마그마가 올라와 식으면서 새로운 해양 지각을 만든다. 일부 광물은 암석이 뜨거울 때 지구 자기장의 영향을 받는다. 암석이 충분히 식으면 당시 자기장의 방향에 관한 기록이 남는다. 돌이 일종의 오래된 나침반 역할을 하는 셈이다.',
'나침반이 항상 지금과 같은 방향을 가리켰던 것은 아니다. 지질학적 과거에 지구 자기장의 극성은 여러 번 바뀌었다. 그래서 서로 다른 시기에 굳은 암석은 서로 다른 자기 기록을 갖는다. 여기서 자기장의 변화와 지리적 북극의 위치를 혼동해서는 안 된다. 지금 이야기하는 것은 지구 자기장의 극성에 대한 기록이다.',
'해저의 자기를 조사하자 놀라운 무늬가 드러났다. 중앙해령의 양쪽에 현재와 같은 극성, 반대 극성을 기록한 띠가 번갈아 나타났다. 더욱 중요한 점은 그 배열이 양쪽에서 대응한다는 것이었다. 한 줄의 우연한 무늬보다, 중심을 사이에 두고 이어지는 규칙적인 무늬가 훨씬 강한 단서가 되었다.',
'해저 확장은 이 무늬를 설명한다. 해령에서 만들어진 지각이 양쪽으로 이동하는 동안 새로운 지각이 가운데를 채운다. 자기장의 극성이 바뀌면 이후에 생긴 암석에는 다른 기록이 남는다. 긴 시간 동안 이 과정이 반복되면서 양쪽에 띠 모양의 기록이 쌓인다. 벨트가 양방향으로 천천히 움직이며 무늬를 받아 적는 모습을 떠올리면 쉽다.',
'암석의 나이를 확인하는 방법도 중요했다. 자기 무늬만으로는 “어떤 순서였는가”에 가까운 정보를 얻지만, 연대 측정을 연결하면 “언제였는가”를 따질 수 있다. 해령 가까이의 암석이 젊고 멀어질수록 대체로 오래된다는 증거와 자기 기록은 함께 해저 확장 설명을 뒷받침했다. 한 가지 관찰에 기대던 이야기가 여러 증거가 맞물리는 설명으로 바뀐 것이다.',
'물론 해양 지각이 만들어지기만 한다면 지구 표면은 계속 늘어나야 한다. 판구조론에서는 다른 지역의 섭입을 통해 해양 지각이 지구 내부로 들어가는 과정도 설명한다. 만들어지는 곳과 사라지는 곳을 함께 보아야 전체 움직임을 이해할 수 있다.',
'돌은 글을 쓰지 않지만, 만들어진 환경의 흔적을 간직한다. 과학자가 읽는 것은 돌의 의도가 아니라 그 흔적들 사이의 관계다. 과거를 아는 방법은 과거로 직접 돌아가는 것만이 아니다. 지금 남아 있는 기록들을, 서로 모순되지 않는 하나의 설명으로 연결하는 방법도 있다.'
],
vocabulary:[{term:'잔류 자기',meaning:'외부 자기장의 영향으로 자성을 띤 뒤 암석 등에 남아 있는 자기',example:'암석의 잔류 자기는 과거 자기장의 방향을 알려 주는 단서다.'},{term:'섭입',meaning:'한 지각판이 다른 판 아래로 들어가는 과정',example:'생성되는 해양 지각과 섭입하는 해양 지각을 함께 살펴야 한다.'},{term:'맞물리다',meaning:'여러 요소가 연결되어 서로 작용하다',example:'독립적인 증거들이 맞물릴 때 설명은 더 설득력을 얻는다.'}],
prompt:'겉모양이 비슷하다는 관찰과, 양쪽에서 대응하는 자기 띠는 증거로서 어떻게 다를까?',
sources:[{name:'USGS · Developing the theory',url:'https://pubs.usgs.gov/gip/dynamic/developing.html'},{name:'USGS · Magnetic stripes and isotopic clocks',url:'https://pubs.usgs.gov/gip/dynamic/stripes.html'}]
},
{
id:'en-seeds',language:'en',category:'환경 · 미래를 준비하는 과학',title:'A seed bank stores more than seeds',subtitle:'작은 씨앗에 담긴, 아직 선택하지 않은 미래.',minutes:10,concept:'종자 보존과 미래의 선택지',
paragraphs:[
'A library keeps books so that people can return to ideas later. A seed bank does something similar with living material. It preserves seeds that may be needed for research, restoration, or bringing a plant back to a place where it has disappeared. The collection is valuable even when nobody needs to use it today.',
'Keeping seeds alive is different from keeping them growing. In conventional seed banking, suitable seeds are dried and stored in very cold conditions. At Kew’s Millennium Seed Bank, conventional storage uses temperatures of minus twenty degrees Celsius. These conditions slow deterioration and help seeds remain usable for longer.',
'Not every seed can be treated this way. Some cannot survive drying, and others perform poorly in ordinary frozen storage. Even among seeds that tolerate the method, life spans differ. Conservation therefore requires knowing the material, rather than applying one recipe to every species.',
'A packet in storage also needs a record. Researchers must know what plant it came from and where it was collected. They need to monitor whether the seeds are still alive and capable of germinating. A freezer full of unnamed packets would not offer the same possibilities as a carefully documented collection.',
'Think about a game project on your computer. You might save an early version because it contains an idea you are not using now. If you keep only the file and forget what it does, it may be difficult to reuse. A note about the version can preserve part of its value. This is an analogy about documentation, not a claim that a seed is a digital file.',
'A seed bank also cannot replace an entire habitat. A living landscape includes soil, other organisms, and relationships that a stored collection cannot fully contain. The bank provides a resource for future work; it does not make the work of protecting wild places unnecessary.',
'Imagine a restoration project several years from now. Its planners may need a plant that was collected before the project existed. The earlier collection would have preserved an option. Without it, the planners might have fewer choices. The person who collected the seeds did not need to predict every future use in order to make a useful contribution.',
'This is a different way to think about preparation. Some actions pay off by producing a result immediately. Others matter because they keep a possible result within reach. A seed bank belongs to the second kind. It gives future people living material to work with, while reminding us that preservation is an ongoing responsibility.'
],
translation:[
'도서관은 사람들이 나중에 다시 생각을 찾아볼 수 있도록 책을 보관한다. 종자은행은 살아 있는 재료로 비슷한 일을 한다. 연구, 복원, 혹은 사라진 지역에 식물을 다시 도입하는 데 필요한 씨앗을 보존한다. 오늘 당장 아무도 사용하지 않더라도 그 수집품에는 가치가 있다.',
'씨앗을 살아 있게 유지하는 것은 계속 자라게 하는 것과 다르다. 전통적인 종자 보존에서는 적합한 씨앗을 건조한 뒤 매우 낮은 온도에 저장한다. 큐의 밀레니엄 종자은행은 통상적인 저장에 영하 20도를 사용한다. 이 조건은 변질을 늦추고 씨앗을 더 오래 사용할 수 있게 돕는다.',
'모든 씨앗에 이 방법을 적용할 수 있는 것은 아니다. 어떤 씨앗은 건조를 견디지 못하고, 다른 씨앗은 일반적인 냉동 보관에서 잘 유지되지 않는다. 이 방법을 견디는 씨앗끼리도 수명이 다르다. 따라서 보존에는 모든 종에 하나의 처방을 적용하는 대신 재료를 이해하는 일이 필요하다.',
'저장된 봉투에는 기록도 필요하다. 연구자는 어떤 식물에서 나온 씨앗인지, 어디에서 수집했는지 알아야 한다. 씨앗이 여전히 살아 있고 발아할 수 있는지 살펴야 한다. 이름 없는 봉투로 가득한 냉동고는 체계적으로 기록된 수집품과 같은 가능성을 제공하지 못한다.',
'컴퓨터에 있는 게임 프로젝트를 생각해 보자. 지금 쓰지 않는 아이디어가 들어 있어서 초기 버전을 보관할 수 있다. 파일만 남기고 무엇을 하는지 잊으면 다시 활용하기 어려울 수 있다. 버전에 관한 메모는 그 가치의 일부를 보존한다. 이는 기록에 관한 비유이지, 씨앗이 디지털 파일이라는 주장은 아니다.',
'종자은행은 서식지 전체를 대체할 수도 없다. 살아 있는 풍경에는 토양과 다른 생물, 저장된 수집품에 온전히 담을 수 없는 관계들이 있다. 종자은행은 미래 작업에 쓸 자원을 제공하며, 야생의 장소를 보호하는 일을 불필요하게 만들지는 않는다.',
'몇 년 뒤의 복원 사업을 상상해 보자. 담당자들은 사업이 존재하기 전에 수집된 식물이 필요할 수 있다. 과거의 수집이 선택지를 보존해 둔 셈이다. 그것이 없으면 선택의 폭이 좁아질 수 있다. 씨앗을 모은 사람이 미래의 모든 용도를 예측해야만 유용한 기여를 할 수 있었던 것은 아니다.',
'이는 준비를 바라보는 또 다른 방식이다. 어떤 행동은 즉시 결과를 내기 때문에 도움이 된다. 다른 행동은 가능한 결과를 손에 닿는 곳에 남겨 두기 때문에 중요하다. 종자은행은 두 번째에 속한다. 미래의 사람들에게 활용할 살아 있는 재료를 주며, 보존은 지속적인 책임임을 일깨운다.'
],
vocabulary:[{term:'preserve',meaning:'보존하다',example:'A seed bank preserves living material.'},{term:'deterioration',meaning:'변질, 상태의 악화',example:'Cold conditions slow deterioration.'},{term:'germinate',meaning:'발아하다, 싹이 트다',example:'Researchers check whether seeds can germinate.'},{term:'restoration',meaning:'복원',example:'The seeds may support a restoration project.'},{term:'within reach',meaning:'손에 닿는 곳에; 실현 가능한 범위에',example:'Preparation keeps a possible result within reach.'}],
questions:[{question:'What is the main value discussed in the article?',options:['Making every seed grow immediately','Preserving material and future options','Replacing all natural habitats','Keeping unnamed packets'],answer:1,explanation:'종자은행은 살아 있는 재료와 미래에 활용할 선택지를 남긴다.'},{question:'Why is documentation important?',options:['It makes freezers colder','It replaces germination tests','It records identity and collection context','It turns seeds into digital files'],answer:2,explanation:'어떤 식물에서, 어디서 수집한 씨앗인지 기록해야 활용할 수 있다.'},{question:'All seeds tolerate drying and freezing. True or false?',options:['True','False'],answer:1,explanation:'건조에 약하거나 통상적인 냉동 보관에서 오래 유지되지 않는 종이 있다.'},{question:'What does “within reach” mean in the final paragraph?',options:['Inside a person’s hand','Already completed','Impossible to achieve','Still possible to achieve'],answer:3,explanation:'미래의 결과가 실현 가능한 범위에 남아 있다는 뜻이다.'}],
prompt:'당장 쓰지 않더라도 보관해 두면 미래의 선택지를 늘리는 것은 무엇일까?',
sources:[{name:'Kew · Seed collection',url:'https://www.kew.org/science/collections-and-resources/collections/seed-collection'},{name:'Kew · Seeds for life',url:'https://www.kew.org/read-and-watch/seeds-for-life'},{name:'Kew · How to preserve seeds for the future',url:'https://www.kew.org/read-and-watch/seed-collecting-msb'}]
}
];
export const previousTopics = ['전력과 AI 데이터센터','편리함의 숨은 비용','지루함과 주의력','수리와 전자폐기물','직장의 AI 도입','하이브리드 근무','별빛과 과거','화폐의 시간 가치','도시와 낯선 사람의 협력','기억의 변화','빛공해','정밀한 시간과 표준시','비행 원리','화폐와 신뢰','항생제','교통 방향','지도 투영','냉장고','도시와 물류','인터넷','소금','사회 규범','인플레이션','60진법','방언 형성','연관통','유리의 투명성','계절의 열과 지구온난화'];
