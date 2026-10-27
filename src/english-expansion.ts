import type {Article} from './articles';
import type {Guide} from './english-lessons';
import type {LessonSearchInfo} from './site';

// Each lesson keeps its source text, translation, teaching notes and search summary together.
export const additionalEnglishContent: {article:Article;guides:Guide[];search:LessonSearchInfo}[] = [
  {
    article: {
      id:'en-opportunity-cost',language:'en',category:'경제 · 선택의 기준',title:'The hidden price of a free afternoon',
      subtitle:'돈을 쓰지 않는 선택에도 포기하는 다른 가능성이 있다.',minutes:9,concept:'기회비용과 차선의 대안',
      paragraphs:[
        'Imagine that you have a free afternoon. You could join a friend on a walk, practice English, or finish a small game project. None of these activities requires a payment today. Yet choosing one still has a cost: the chance to do something else with the same hours. A free afternoon is not an afternoon without limits.',
        'Economists call the value of the next-best alternative the opportunity cost. Suppose you choose the game project, and a walk would have been your second choice. The opportunity cost is the value of that walk. It is not the combined value of every activity you can imagine, because you could not have done all of them during those hours.',
        'This distinction changes how you compare options. The relevant alternative must be something you could actually choose. If your friend is away, walking together is no longer available. If an English assignment is due tonight, its importance may rise. A useful comparison depends on your real situation, rather than an unlimited list of attractive possibilities.',
        'Consider a second, imaginary choice. A club offers a free workshop, but attending it takes the only evening you have to rest. There is no ticket price, although the time still matters. You might happily attend. You might also decide that rest is more valuable this week. The word free cannot settle that question for you.',
        'Opportunity cost does not tell you to earn money every minute. Friendship, curiosity, and quiet time can all be valuable alternatives. Their value need not be expressed in the same currency. In our afternoon example, working on the game may be worth giving up the walk. Noticing a cost is different from deciding that the choice is wrong.',
        'Before making your next small plan, name one realistic alternative. Ask what you would give up and why the chosen activity matters more to you now. You do not need a perfect calculation. You need a clearer comparison. A thoughtful choice begins when an invisible alternative becomes part of the conversation.'
      ],
      translation:[
        '자유로운 오후가 있다고 상상해 보자. 친구와 산책하거나, 영어를 연습하거나, 작은 게임 프로젝트를 마무리할 수 있다. 어느 활동도 오늘 돈을 내야 하는 것은 아니다. 그렇지만 하나를 고르면 같은 시간에 다른 일을 할 기회를 포기한다는 비용이 생긴다. 자유로운 오후라고 해서 아무런 한계도 없는 것은 아니다.',
        '경제학에서는 선택하지 않은 차선의 대안이 가진 가치를 기회비용이라고 한다. 게임 프로젝트를 선택했고 산책이 두 번째로 원했던 활동이었다고 하자. 기회비용은 그 산책의 가치다. 상상할 수 있는 모든 활동의 가치를 합친 것은 아니다. 그 시간 동안 모든 활동을 할 수는 없었기 때문이다.',
        '이 구분은 선택지를 비교하는 방식을 바꾼다. 비교 대상인 대안은 실제로 선택할 수 있는 것이어야 한다. 친구가 멀리 가 있다면 함께 걷는 선택은 더 이상 가능하지 않다. 영어 과제의 마감이 오늘 밤이라면 그 중요성이 커질 수 있다. 유용한 비교는 매력적인 가능성을 끝없이 나열하는 대신 실제 상황에 따라 이루어진다.',
        '두 번째 가상 사례를 생각해 보자. 한 동아리가 무료 워크숍을 열지만 참석하면 쉴 수 있는 유일한 저녁을 써야 한다. 입장료는 없어도 시간은 여전히 중요하다. 기꺼이 참석할 수도 있고, 이번 주에는 휴식이 더 가치 있다고 판단할 수도 있다. 무료라는 말만으로는 그 질문에 답할 수 없다.',
        '기회비용은 매 순간 돈을 벌라고 말하는 개념이 아니다. 우정과 호기심, 조용히 보내는 시간도 가치 있는 대안이 될 수 있다. 그 가치를 같은 화폐 단위로 나타낼 필요도 없다. 앞의 오후 사례에서는 산책을 포기하고 게임을 만드는 일이 충분히 가치 있을 수 있다. 비용을 알아차리는 것과 그 선택이 잘못됐다고 판단하는 것은 다르다.',
        '다음에 작은 계획을 세우기 전에 현실적인 대안 하나를 말해 보자. 무엇을 포기하는지, 그리고 지금 선택한 활동이 자신에게 왜 더 중요한지 질문해 보자. 완벽한 계산까지 필요한 것은 아니다. 더 명확한 비교가 필요하다. 눈에 보이지 않던 대안이 대화에 등장할 때 신중한 선택이 시작된다.'
      ],
      vocabulary:[
        {term:'alternative',meaning:'대안; 다른 선택지',example:'A walk is a realistic alternative to another hour at the desk.'},
        {term:'opportunity cost',meaning:'기회비용; 포기한 차선 대안의 가치',example:'The opportunity cost of the workshop is an evening of rest.'},
        {term:'give up',meaning:'포기하다',example:'I gave up the walk to finish my project.'},
        {term:'combined',meaning:'합쳐진',example:'The cost is not the combined value of every possible activity.'},
        {term:'relevant',meaning:'관련이 있는; 판단에 필요한',example:'Only available options are relevant to this comparison.'},
        {term:'settle a question',meaning:'문제에 결론을 내리다',example:'A low price alone cannot settle the question.'},
        {term:'currency',meaning:'통화; 가치를 나타내는 화폐 단위',example:'We cannot express every benefit in the same currency.'},
        {term:'thoughtful',meaning:'깊이 생각한; 신중한',example:'A thoughtful plan leaves room for rest.'}
      ],
      prompt:'오늘 선택한 활동 하나와, 그 대신 할 수 있었던 가장 가치 있는 활동 하나를 비교해 보세요.',
      sources:[
        {name:'St. Louis Fed · Real-Life Examples of Opportunity Cost',url:'https://www.stlouisfed.org/open-vault/2020/january/real-life-examples-opportunity-cost'},
        {name:'OpenStax · Budget Constraints and Opportunity Cost (CC BY 4.0)',url:'https://openstax.org/books/principles-microeconomics-3e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint'}
      ]
    },
    guides:[
      {title:'돈과 시간의 비용 구분하기',structure:'None of these activities requires ...는 어느 활동도 비용을 요구하지 않는다는 부정입니다. Yet은 돈을 내지 않아도 비용이 있다는 전환을 만듭니다.',checks:['금전 지출이 없다는 것과 선택의 비용이 없다는 것을 구분했나요?','the same hours를 한정된 같은 시간으로 옮겼나요?'],expression:'the chance to do something else → 다른 일을 할 기회',natural:'free afternoon은 공짜 오후보다 “일정이 없는 자유로운 오후”가 자연스럽습니다.'},
      {title:'차선의 대안 하나에 주목하기',structure:'call A B는 A를 B라고 부른다는 뜻입니다. would have been은 선택하지 않은 상황에서 무엇이 차선이었을지를 나타냅니다.',checks:['next-best를 선택한 것 다음으로 좋은 대안으로 이해했나요?','기회비용을 모든 대안의 합으로 옮기지 않았나요?'],expression:'the next-best alternative → 차선의 대안',natural:'the value of that walk는 산책에 드는 돈이 아니라 그 산책이 주는 가치를 말합니다.'},
      {title:'조건에 따라 바뀌는 비교 대상',structure:'something you could actually choose에서 뒤 절은 something을 수식합니다. rather than은 무한한 가능성의 목록과 현실 상황을 대비합니다.',checks:['실제로 가능한 대안이어야 한다는 조건을 담았나요?','마감 때문에 과제의 중요성이 커질 수 있다는 가능성을 살렸나요?'],expression:'be due tonight → 오늘 밤이 마감이다',natural:'your friend is away는 친구가 반드시 해외에 갔다는 뜻이 아니라 지금 함께할 수 없는 곳에 있다는 뜻입니다.'},
      {title:'although와 might의 의미',structure:'although는 입장료가 없다는 사실을 인정하면서 시간의 중요성을 연결합니다. might는 서로 가능한 두 판단을 제시합니다.',checks:['워크숍이 실제 행사라는 뜻으로 단정하지 않았나요?','참석과 휴식 어느 쪽도 가능한 선택이라는 점을 옮겼나요?'],expression:'settle that question → 그 문제에 결론을 내리다',natural:'takes the only evening은 저녁을 가져간다는 직역보다 “유일하게 쉴 수 있는 저녁을 써야 한다”가 자연스럽습니다.'},
      {title:'비용을 알기와 잘못을 판단하기',structure:'need not be expressed는 표현할 필요가 없다는 뜻입니다. be worth 뒤의 giving up은 감수할 만한 행동을 나타냅니다.',checks:['기회비용을 돈벌이만의 기준으로 좁히지 않았나요?','비용이 있어도 가치 있는 선택일 수 있다는 결론을 담았나요?'],expression:'be worth giving up the walk → 산책을 포기할 만한 가치가 있다',natural:'quiet time은 소리가 전혀 없는 시간보다는 차분히 쉬거나 혼자 보내는 시간을 뜻합니다.'},
      {title:'명령문과 의문절 연결하기',structure:'Ask 뒤의 what과 why는 질문의 내용을 이끄는 간접의문절입니다. when은 더 신중한 선택이 시작되는 시점을 나타냅니다.',checks:['현실적인 대안을 하나 골라 보라는 제안을 옮겼나요?','완벽한 수치 계산이 필요하다는 뜻으로 바꾸지 않았나요?'],expression:'become part of the conversation → 논의에 포함되다',natural:'invisible alternative는 실제로 보이지 않는 물체가 아니라 그동안 고려하지 않았던 대안입니다.'}
    ],
    search:{title:'기회비용과 시간 선택 영어 독해',description:'자유로운 오후와 무료 워크숍의 가상 사례로 기회비용을 배우는 영어 지문입니다. 문단별 해석, 조건·비교 구문 해설과 핵심 단어를 제공합니다.',focus:'대안 비교·조건절·가치 표현'}
  },
  {
    article: {
      id:'en-sunk-cost',language:'en',category:'경제 · 계속할지 멈출지',title:'Why yesterday cannot choose for tomorrow',
      subtitle:'이미 쓴 시간이 아니라, 앞으로 얻을 것과 들일 것을 비교한다.',minutes:9,concept:'매몰비용과 앞으로의 비용·편익',
      paragraphs:[
        'Imagine a student who has spent three weekends building a game level. The first version looked exciting, but playtests now reveal a serious problem: players cannot understand the main goal. The student has a new idea that might work better. Still, starting again feels painful. Leaving the old design behind seems to make those weekends disappear.',
        'The time already spent cannot be recovered, whether the student continues or changes direction. Economists describe an unrecoverable past cost as a sunk cost. That time explains how the project reached its present state. It does not, by itself, show which next step will produce the best result. History and a reason to continue are different things.',
        'In this fictional example, the student writes down two plans. Repairing the current level would take another weekend. Building a simpler version would take the same amount of time. The useful question is which plan offers the better expected outcome from today onward. Counting the old weekends again does not reveal what either new weekend will achieve.',
        'Ignoring sunk costs does not mean ignoring everything you learned. The playtests may reveal where players get confused, and an old visual effect may still be reusable. Those facts can change the value of the available options. The important distinction is between useful knowledge or resources that remain and effort that cannot be brought back.',
        'Nor does the idea mean that quitting is always wise. Perhaps a small repair would solve the problem, while rebuilding would introduce larger risks. In that case, continuing could be sensible. The decision should depend on future costs and benefits, including uncertainty, rather than a wish to prove that every earlier choice was correct.',
        'When a project feels difficult to leave, try this question: if you were choosing today, with the knowledge and materials you now have, what would you do next? Your answer may still be to continue. But it will rest on a clearer reason. Yesterday can inform the decision without being allowed to make it for you.'
      ],
      translation:[
        '한 학생이 세 번의 주말을 들여 게임 레벨을 만들었다고 상상해 보자. 첫 버전은 흥미로워 보였지만 플레이 테스트에서 심각한 문제가 드러난다. 플레이어들이 핵심 목표를 이해하지 못한다는 것이다. 학생에게는 더 잘 작동할지도 모르는 새 아이디어가 있다. 그래도 다시 시작하기는 괴롭다. 기존 설계를 버리면 그 주말들이 사라지는 것처럼 느껴진다.',
        '학생이 계속하든 방향을 바꾸든 이미 쓴 시간은 되찾을 수 없다. 경제학에서는 회수할 수 없는 과거의 비용을 매몰비용이라고 한다. 그 시간은 프로젝트가 어떻게 현재 상태에 이르렀는지 설명한다. 하지만 그것만으로 어떤 다음 행동이 가장 좋은 결과를 낼지는 알 수 없다. 지나온 이력과 계속해야 할 이유는 서로 다르다.',
        '이 가상 사례에서 학생은 두 가지 계획을 적는다. 현재 레벨을 고치려면 주말을 하나 더 써야 한다. 더 단순한 버전을 만드는 데에도 같은 시간이 든다. 유용한 질문은 지금부터 어느 계획이 더 좋은 결과를 낼 것으로 예상되는가이다. 지나간 주말을 다시 계산에 넣어도 새로운 주말에 각각 무엇을 이룰지는 알 수 없다.',
        '매몰비용을 고려하지 않는다고 해서 배운 것을 모두 무시하라는 뜻은 아니다. 플레이 테스트는 플레이어가 어디에서 혼란을 느끼는지 보여 줄 수 있고, 예전에 만든 시각 효과를 다시 쓸 수도 있다. 이런 사실은 현재 가능한 선택지의 가치를 바꾼다. 남아 있는 유용한 지식이나 자원과 되돌릴 수 없는 노력을 구분하는 것이 중요하다.',
        '이 개념이 언제나 그만두는 것이 현명하다는 뜻도 아니다. 조금만 고치면 문제가 해결되는 반면 새로 만드는 일에는 더 큰 위험이 따를 수도 있다. 그렇다면 계속하는 것이 합리적일 수 있다. 결정은 과거의 모든 선택이 옳았다고 증명하려는 바람보다 불확실성을 포함한 미래의 비용과 편익에 따라야 한다.',
        '프로젝트를 그만두기 어렵게 느껴진다면 이렇게 물어보자. 지금 가진 지식과 재료를 가지고 오늘 선택한다면 다음에 무엇을 하겠는가? 여전히 계속하겠다고 답할 수도 있다. 다만 그 선택에는 더 분명한 이유가 있을 것이다. 어제의 경험을 참고할 수는 있지만, 그것이 자신을 대신해 결정을 내리게 할 필요는 없다.'
      ],
      vocabulary:[
        {term:'reveal',meaning:'드러내다; 밝혀내다',example:'The playtest revealed a confusing instruction.'},
        {term:'recover',meaning:'되찾다; 회수하다',example:'We cannot recover the hours already spent.'},
        {term:'sunk cost',meaning:'매몰비용; 이미 발생해 회수할 수 없는 비용',example:'Yesterday’s unrecoverable payment is a sunk cost.'},
        {term:'by itself',meaning:'그것만으로는',example:'Past effort does not justify a decision by itself.'},
        {term:'from today onward',meaning:'오늘부터 앞으로',example:'Compare what each plan can achieve from today onward.'},
        {term:'reusable',meaning:'다시 사용할 수 있는',example:'The old sound effect is still reusable.'},
        {term:'sensible',meaning:'분별 있는; 합리적인',example:'A small repair may be a sensible choice.'},
        {term:'uncertainty',meaning:'불확실성',example:'Both plans involve some uncertainty.'}
      ],
      prompt:'계속하는 이유가 이미 들인 노력인지, 앞으로 기대되는 가치인지 구분할 수 있는 프로젝트를 떠올려 보세요.',
      sources:[
        {name:'St. Louis Fed · Three Ways to Think Like an Economist',url:'https://www.stlouisfed.org/open-vault/2020/march/three-ways-think-like-an-economist'},
        {name:'OpenStax · Sunk Costs (CC BY 4.0)',url:'https://openstax.org/books/principles-microeconomics-3e/pages/2-1-how-individuals-make-choices-based-on-their-budget-constraint'}
      ]
    },
    guides:[
      {title:'지금까지 들인 시간과 현재 문제',structure:'has spent는 과거부터 현재까지 투입한 시간을 나타냅니다. might work better는 새 아이디어의 가능성이며 확정된 결과가 아닙니다.',checks:['세 주말이 이미 지난 시간이라는 점을 담았나요?','새 아이디어가 반드시 성공한다고 단정하지 않았나요?'],expression:'leave the old design behind → 기존 설계를 뒤로하고 떠나다',natural:'make those weekends disappear는 실제 시간이 사라진다는 뜻보다 노력이 헛수고가 되는 듯한 느낌입니다.'},
      {title:'whether A or B와 근거의 범위',structure:'whether ... continues or changes는 어느 경우에도 회수할 수 없다는 뜻입니다. by itself는 그 사실 하나만을 근거로 삼는 범위를 제한합니다.',checks:['계속해도 이미 쓴 시간을 되찾을 수 없다는 뜻을 옮겼나요?','과거의 노력이 다음 행동의 성과를 증명하지는 않는다고 이해했나요?'],expression:'an unrecoverable past cost → 회수할 수 없는 과거의 비용',natural:'History는 여기서 역사 과목이 아니라 프로젝트가 걸어온 과정입니다.'},
      {title:'미래의 두 계획을 나란히 비교하기',structure:'would take는 가상 계획에 예상되는 시간을 나타냅니다. which plan ...은 question의 내용을 설명합니다.',checks:['두 계획 모두 추가로 주말 하나가 든다는 비교를 살렸나요?','expected outcome을 확정된 성과와 구분했나요?'],expression:'from today onward → 오늘부터 앞으로',natural:'Counting the old weekends again은 달력을 다시 세는 일이 아니라 이미 쓴 시간을 선택의 근거에 다시 넣는다는 뜻입니다.'},
      {title:'남은 자산과 회수 불가능한 노력',structure:'Ignoring ... does not mean ignoring ...는 두 행동을 구분하는 구조입니다. between A and B에서 A와 B의 범위를 각각 찾아보세요.',checks:['과거에 배운 정보와 재사용할 자원은 여전히 고려할 수 있다고 옮겼나요?','무시할 대상이 과거의 모든 경험이라고 확대하지 않았나요?'],expression:'remain reusable → 다시 쓸 수 있는 상태로 남아 있다',natural:'available options는 아무 선택이나가 아니라 현재 실행 가능한 선택지입니다.'},
      {title:'Nor로 덧붙이는 부정',structure:'Nor does the idea mean ...는 앞의 부정에 “또한 그런 뜻도 아니다”를 덧붙입니다. while은 두 계획의 위험을 대조합니다.',checks:['언제나 포기하라는 주장으로 옮기지 않았나요?','continuing could be sensible의 가능성을 유지했나요?'],expression:'future costs and benefits → 미래의 비용과 편익',natural:'benefits는 복지 혜택이 아니라 선택으로 얻는 이득을 뜻합니다.'},
      {title:'가정 질문으로 선택의 근거 바꾸기',structure:'if you were choosing today는 현재 상황을 가정합니다. without being allowed to ...는 과거가 결정을 대신하지 않도록 범위를 제한합니다.',checks:['현재 가진 지식과 재료를 전제로 질문한다고 옮겼나요?','계속한다는 결론도 가능하다는 뜻을 담았나요?'],expression:'rest on a clearer reason → 더 분명한 이유에 근거하다',natural:'Yesterday는 어제 하루뿐 아니라 지금까지의 선택과 노력을 비유합니다.'}
    ],
    search:{title:'매몰비용과 프로젝트 선택 영어 독해',description:'게임 개발 프로젝트의 가상 사례로 매몰비용과 미래의 비용·편익을 구분하는 영어 지문입니다. 참고 번역, 부정·가정 구문 해설과 단어를 제공합니다.',focus:'현재완료·양자 조건·부정과 가정'}
  },
  {
    article: {
      id:'en-retrieval',language:'en',category:'심리 · 기억과 학습',title:'The moment you close the book',
      subtitle:'읽을 때의 익숙함과, 혼자 떠올릴 수 있는지는 다르다.',minutes:9,concept:'인출 연습과 장기 기억',
      paragraphs:[
        'A learner reads an English paragraph three times. By the third reading, every sentence feels familiar. Then she closes the page and tries to explain the main idea. Suddenly, the words are difficult to find. In this imagined scene, the paragraph has not changed. The task has: recognizing an explanation is different from producing one without looking.',
        'Trying to bring information to mind is called retrieval. It can also be a way to learn, rather than only a way to measure learning. In experiments by Henry Roediger and Jeffrey Karpicke, students studied short passages and then either studied again or practiced recalling them. The researchers later tested what the students could remember.',
        'The timing mattered. Repeated study helped more on a test only a few minutes later, but retrieval practice produced better recall after longer delays in those experiments. That does not mean rereading is useless. It means a method that feels effective immediately may not be the method that best supports remembering several days later.',
        'Return to our learner. She writes one sentence about the paragraph while the page is closed. Next, she opens it and checks what she missed. Perhaps she remembered the topic but confused the cause with the result. Her note now gives her a specific question for the next reading, instead of another general feeling that the paragraph looks familiar.',
        'A small recall attempt need not become a difficult exam. You might explain a new word, list two ideas, or answer a question in your own words. Then compare your answer with the material and correct mistakes. Choose a prompt you can meaningfully attempt. Simply staring at an impossible question does not make it a useful exercise.',
        'For your next reading session, try leaving a short space between seeing an explanation and checking it again. Use that space to ask what you can bring back on your own. The goal is not to avoid the book forever. It is to give yourself a chance to practice remembering before the book supplies the answer.'
      ],
      translation:[
        '한 학습자가 영어 문단을 세 번 읽는다. 세 번째에는 모든 문장이 익숙하게 느껴진다. 그런데 페이지를 닫고 중심 내용을 설명하려 하자 갑자기 말이 잘 떠오르지 않는다. 이 가상 장면에서 문단은 바뀌지 않았다. 바뀐 것은 과제다. 설명을 보고 알아보는 것과 보지 않고 스스로 설명하는 것은 다르다.',
        '정보를 머릿속으로 불러오려는 일을 인출이라고 한다. 인출은 학습한 것을 측정하는 방법일 뿐 아니라 배우는 방법이 될 수도 있다. 헨리 뢰디거와 제프리 카피키의 실험에서는 학생들이 짧은 글을 공부한 뒤 다시 공부하거나 내용을 떠올리는 연습을 했다. 연구자들은 나중에 학생들이 무엇을 기억하는지 검사했다.',
        '검사 시점이 중요했다. 불과 몇 분 뒤의 검사에서는 반복해서 공부하는 편이 더 도움이 되었지만, 그 실험들에서 더 긴 시간이 지난 뒤에는 인출 연습을 한 쪽이 더 잘 기억했다. 다시 읽기가 쓸모없다는 뜻은 아니다. 당장 효과적으로 느껴지는 방법이 며칠 뒤의 기억을 가장 잘 돕는 방법과 같지는 않을 수 있다는 뜻이다.',
        '앞의 학습자로 돌아가 보자. 페이지를 닫은 채 문단에 관한 문장을 하나 적는다. 그런 다음 페이지를 열고 무엇을 빠뜨렸는지 확인한다. 주제는 기억했지만 원인과 결과를 혼동했을 수도 있다. 이 메모는 문단이 익숙해 보인다는 막연한 느낌 대신 다음에 읽을 때 확인할 구체적인 질문을 준다.',
        '짧게 떠올려 보는 시도가 어려운 시험이 될 필요는 없다. 새 단어를 설명하거나, 두 가지 생각을 나열하거나, 자기 말로 질문에 답할 수 있다. 그런 다음 자료와 답을 비교하고 오류를 고친다. 의미 있게 시도해 볼 수 있는 질문을 고르자. 답하기 불가능한 질문을 바라보기만 한다고 유용한 연습이 되는 것은 아니다.',
        '다음 읽기 시간에는 설명을 본 뒤 다시 확인하기까지 짧은 틈을 두어 보자. 그 시간을 이용해 혼자 무엇을 떠올릴 수 있는지 물어보자. 책을 영원히 피하는 것이 목표는 아니다. 책이 답을 보여 주기 전에 기억을 꺼내는 연습을 할 기회를 스스로에게 주는 것이다.'
      ],
      vocabulary:[
        {term:'familiar',meaning:'익숙한',example:'The sentence looked familiar, but I could not explain it.'},
        {term:'bring to mind',meaning:'떠올리다',example:'Try to bring the main idea to mind without looking.'},
        {term:'retrieval',meaning:'인출; 저장된 기억을 불러오는 것',example:'Retrieval begins when you try to remember an answer.'},
        {term:'recall',meaning:'회상하다; 기억해 내기',example:'She practiced recalling the ideas in her own words.'},
        {term:'delay',meaning:'지연; 시간이 지난 간격',example:'The final test came after a longer delay.'},
        {term:'confuse A with B',meaning:'A와 B를 혼동하다',example:'Do not confuse the cause with the result.'},
        {term:'specific',meaning:'구체적인',example:'The note gave him a specific question to review.'},
        {term:'on your own',meaning:'혼자 힘으로',example:'Explain the example on your own before checking it.'}
      ],
      prompt:'이 글을 잠시 닫고, 다시 읽기와 인출 연습의 차이를 자신의 말로 한 문장에 설명해 보세요.',
      sources:[
        {name:'Roediger & Karpicke (2006) · Test-Enhanced Learning',url:'https://doi.org/10.1111/j.1467-9280.2006.01693.x'},
        {name:'Roediger & Karpicke (2006) · The Power of Testing Memory',url:'https://doi.org/10.1111/j.1745-6916.2006.00012.x'}
      ]
    },
    guides:[
      {title:'알아보기와 스스로 만들어 내기',structure:'By the third reading은 세 번째 읽는 시점까지를 뜻합니다. recognizing과 producing은 is different from으로 대비되는 두 동명사입니다.',checks:['익숙함과 혼자 설명할 수 있는 능력을 구분했나요?','바뀐 것이 문단이 아니라 과제라는 뜻을 담았나요?'],expression:'without looking → 보지 않고',natural:'the words are difficult to find는 사전에서 단어를 찾기 어렵다는 뜻보다 할 말이 떠오르지 않는다는 뜻입니다.'},
      {title:'정의와 실험의 두 조건',structure:'Trying to ...는 문장 전체의 주어입니다. either studied again or practiced ...는 두 가지 실험 조건을 연결합니다.',checks:['인출을 기억을 떠올리려는 시도로 옮겼나요?','두 조건을 한 학생이 반드시 모두 수행했다는 뜻으로 바꾸지 않았나요?'],expression:'a way to measure learning → 학습을 측정하는 방법',natural:'passages는 통로나 여행이 아니라 실험에서 읽은 짧은 글을 뜻합니다.'},
      {title:'실험의 시간 범위를 유지하기',structure:'helped more ... but ...는 검사 시점에 따른 결과의 차이입니다. may not be는 언제나 같다고 볼 수 없다는 제한입니다.',checks:['장기 기억의 결과를 즉시 검사 결과와 구분했나요?','이 실험에서의 결과를 모든 상황에 대한 단정으로 넓히지 않았나요?'],expression:'after longer delays → 더 긴 시간이 지난 뒤에',natural:'rereading is useless는 앞의 does not mean과 연결되어 “다시 읽기가 쓸모없다는 뜻은 아니다”가 됩니다.'},
      {title:'빠뜨린 의미를 확인하는 순서',structure:'while the page is closed는 문장을 쓰는 동안의 상태입니다. what she missed는 checks의 목적어인 간접의문절입니다.',checks:['먼저 보지 않고 적은 뒤 자료를 확인한다는 순서를 담았나요?','cause와 result를 서로 다른 개념으로 옮겼나요?'],expression:'a specific question → 구체적인 질문',natural:'Return to our learner는 학습자에게 돌아가라는 이동 지시가 아니라 앞의 사례를 다시 살펴보자는 말입니다.'},
      {title:'need not과 연속된 제안',structure:'need not become은 될 필요가 없다는 뜻입니다. explain, list, answer는 might 뒤에서 가능한 활동으로 나열됩니다.',checks:['반드시 어려운 시험을 봐야 한다는 뜻으로 옮기지 않았나요?','답을 시도한 뒤 확인하고 고친다는 과정까지 담았나요?'],expression:'in your own words → 자신의 말로',natural:'prompt는 여기서 AI에게 보내는 명령만을 뜻하지 않고 답을 떠올리게 하는 질문이나 단서를 뜻합니다.'},
      {title:'before가 만드는 연습의 시점',structure:'between seeing ... and checking ...은 두 행동 사이의 간격입니다. before the book supplies ...는 스스로 떠올릴 시점을 정합니다.',checks:['자료를 영원히 보지 말라는 뜻으로 확대하지 않았나요?','책의 답을 보기 전에 혼자 기억해 보는 기회를 담았나요?'],expression:'bring back on your own → 혼자 힘으로 떠올리다',natural:'a short space는 물리적인 공간이 아니라 두 번의 확인 사이에 두는 시간적 틈입니다.'}
    ],
    search:{title:'인출 연습과 기억력 영어 독해',description:'책을 덮고 떠올리는 인출 연습과 다시 읽기의 차이를 다룬 영어 지문입니다. 학습 실험의 결과와 범위를 읽고 문단별 번역·해설·단어를 공부하세요.',focus:'동명사 비교·실험 조건·시간 표현'}
  },
  {
    article: {
      id:'en-task-switching',language:'en',category:'심리 · 집중과 작업',title:'The small cost of changing tabs',
      subtitle:'다시 시작할 때 필요한 준비도 작업 시간의 일부다.',minutes:9,concept:'과제 전환 비용과 주의 조절',
      paragraphs:[
        'Imagine writing an English translation while a group chat stays open beside it. You read a sentence, answer a message, and return to the sentence. Nothing dramatic interrupts you. Still, you may need a moment to remember the subject, the main verb, and the phrase you had not yet understood. Returning is also part of the work.',
        'Psychologists use task-switching experiments to study this kind of change. Participants might follow one rule for a group of items and another rule for the next group. Researchers compare performance when a rule repeats with performance when it changes. Switching often adds time, and the size of that cost depends on the tasks and the conditions.',
        'In research by Joshua Rubinstein, Jeffrey Evans, and David Meyer, switching costs grew as task rules became more complex. Familiarity also mattered. These findings do not give every phone notification a fixed price in seconds. They show why two activities that are manageable separately may require extra effort when you repeatedly move between them.',
        'Think of a fictional translation task with two steps. First, identify what an author claims. Second, choose natural Korean wording. A chat message asks for a meeting time, introducing a different goal. When you return, you must recover the unfinished translation problem. The message may take only a moment to answer, while the whole interruption lasts longer.',
        'Switching is not always a mistake. You may need to answer an urgent message, compare two documents, or respond to a teammate. The point is to notice when a switch serves your purpose. Keeping every window open does not necessarily mean that every window needs your attention at the same moment. Availability and priority are different ideas.',
        'For your next paragraph, try a small experiment: choose one manageable section, put nonessential messages aside, and finish a first attempt before checking them. Notice whether returning to the text feels different. This personal observation is not a controlled study. It is a practical way to examine a habit and decide which interruptions you actually want.'
      ],
      translation:[
        '영어 해석을 쓰면서 옆에 단체 채팅창을 열어 두었다고 상상해 보자. 한 문장을 읽고 메시지에 답한 뒤 다시 그 문장으로 돌아온다. 극적인 방해는 없다. 그래도 주어와 핵심 동사, 아직 이해하지 못한 구절을 다시 떠올리는 데 잠깐 시간이 필요할 수 있다. 돌아오는 과정도 작업의 일부다.',
        '심리학자들은 이런 변화를 연구하기 위해 과제 전환 실험을 한다. 참가자들은 한 묶음의 항목에는 한 규칙을, 다음 묶음에는 다른 규칙을 적용할 수 있다. 연구자들은 규칙이 반복될 때와 바뀔 때의 수행을 비교한다. 전환에는 흔히 추가 시간이 들며, 그 비용의 크기는 과제와 조건에 따라 달라진다.',
        '조슈아 루빈스타인과 제프리 에번스, 데이비드 마이어의 연구에서는 과제 규칙이 복잡해질수록 전환 비용이 커졌다. 익숙함도 중요했다. 이 결과가 휴대전화 알림 하나하나에 일정한 초 단위 비용을 매겨 주는 것은 아니다. 따로 하면 감당할 수 있는 두 활동도 반복해서 오가면 왜 추가 노력이 필요할 수 있는지 보여 준다.',
        '두 단계로 이루어진 가상의 번역 과제를 생각해 보자. 먼저 글쓴이가 무엇을 주장하는지 파악하고, 다음으로 자연스러운 한국어 표현을 고른다. 그때 약속 시간을 묻는 채팅 메시지가 와서 다른 목표가 생긴다. 돌아오면 끝내지 못한 번역 문제를 다시 떠올려야 한다. 답장은 잠깐이면 되더라도 방해 전체에 걸리는 시간은 더 길 수 있다.',
        '전환이 언제나 잘못은 아니다. 긴급한 메시지에 답하거나 두 문서를 비교하거나 팀원에게 응답해야 할 수도 있다. 중요한 것은 전환이 자신의 목적에 도움이 되는 때를 알아차리는 일이다. 모든 창을 열어 두었다고 해서 모든 창에 동시에 주의를 기울여야 하는 것은 아니다. 이용할 수 있다는 것과 우선해야 한다는 것은 다르다.',
        '다음 문단에서는 작은 실험을 해 보자. 감당할 수 있는 분량 하나를 고르고, 꼭 필요하지 않은 메시지는 잠시 미뤄 두고, 첫 해석을 마친 뒤 메시지를 확인한다. 본문으로 돌아오는 느낌이 다른지 살펴보자. 이 개인적 관찰은 통제 실험이 아니다. 습관을 점검하고 어떤 방해를 받아들일지 정하는 실용적인 방법이다.'
      ],
      vocabulary:[
        {term:'interrupt',meaning:'방해하다; 중단시키다',example:'A short message interrupted the translation.'},
        {term:'task switching',meaning:'과제 전환; 서로 다른 작업으로 주의를 바꾸는 것',example:'Task switching can require extra time.'},
        {term:'participant',meaning:'참가자; 참여자',example:'Each participant followed two different rules.'},
        {term:'familiarity',meaning:'익숙함; 친숙도',example:'Familiarity with a task may affect performance.'},
        {term:'manageable',meaning:'감당할 수 있는',example:'Choose a manageable section for one study session.'},
        {term:'unfinished',meaning:'끝나지 않은',example:'He returned to the unfinished paragraph.'},
        {term:'priority',meaning:'우선순위; 우선하는 일',example:'Availability does not determine priority.'},
        {term:'put aside',meaning:'잠시 미뤄 두다; 한쪽에 두다',example:'She put aside nonessential messages until the paragraph was finished.'}
      ],
      prompt:'공부 중 가장 자주 오가는 두 작업을 적고, 꼭 필요한 전환과 미뤄도 되는 전환을 구분해 보세요.',
      sources:[
        {name:'American Psychological Association · Multitasking: Switching Costs',url:'https://www.apa.org/topics/research/multitasking'},
        {name:'Rubinstein, Meyer & Evans (2001) · Executive Control of Cognitive Processes in Task Switching',url:'https://www.apa.org/pubs/journals/releases/xhp274763.pdf'}
      ]
    },
    guides:[
      {title:'돌아오는 시간까지 포함하기',structure:'while은 두 활동이 함께 열려 있는 상황을 나타냅니다. had not yet understood는 돌아오기 이전에도 아직 이해하지 못했던 상태입니다.',checks:['방해가 극적이지 않아도 다시 파악하는 시간이 필요할 수 있다고 옮겼나요?','Returning을 작업의 일부라는 주어로 이해했나요?'],expression:'return to the sentence → 그 문장으로 돌아오다',natural:'the phrase you had not yet understood는 아직 이해하지 못한 구절이지 이미 이해한 구절이 아닙니다.'},
      {title:'반복 조건과 전환 조건 비교하기',structure:'compare A with B는 두 조건의 수행을 비교합니다. when 절은 규칙이 반복되거나 바뀌는 각각의 상황을 나타냅니다.',checks:['비교 대상이 단순히 두 사람이 아니라 두 과제 조건이라는 점을 담았나요?','비용의 크기가 상황에 따라 달라진다고 옮겼나요?'],expression:'depend on the tasks and the conditions → 과제와 조건에 따라 달라지다',natural:'performance는 공연이 아니라 실험 과제를 해내는 수행입니다.'},
      {title:'실험 결과를 일상에 과도하게 옮기지 않기',structure:'as ... became more complex는 복잡해짐에 따른 변화를 나타냅니다. do not give ... a fixed price는 일정한 값으로 환산하지 못한다는 뜻입니다.',checks:['복잡한 규칙에서 전환 비용이 더 컸다는 결과를 담았나요?','모든 알림의 손실 시간이 같다고 단정하지 않았나요?'],expression:'manageable separately → 따로 하면 감당할 수 있는',natural:'price in seconds는 실제 요금이 아니라 초 단위로 나타낸 시간 비용입니다.'},
      {title:'짧은 답장과 전체 방해 구분하기',structure:'introducing a different goal은 메시지가 더하는 영향을 설명합니다. while은 답장 시간과 전체 방해 시간을 대조합니다.',checks:['글의 주장 파악과 한국어 표현 선택을 두 단계로 옮겼나요?','답장에 든 시간만이 방해의 전부는 아니라는 뜻을 담았나요?'],expression:'recover the unfinished problem → 끝내지 못한 문제를 다시 파악하다',natural:'recover는 여기서 병에서 회복하다가 아니라 작업의 맥락을 되찾는다는 뜻입니다.'},
      {title:'not always와 not necessarily',structure:'not always는 언제나 그런 것은 아니라는 부분 부정입니다. does not necessarily mean은 반드시 그런 뜻은 아니라는 제한입니다.',checks:['모든 과제 전환이 나쁘다는 전체 부정으로 옮기지 않았나요?','창을 열어 둠과 당장의 주의 우선순위를 구분했나요?'],expression:'serve your purpose → 자신의 목적에 도움이 되다',natural:'Availability는 이용할 수 있는 상태이고 priority는 먼저 주의를 줄 중요도입니다.'},
      {title:'개인 관찰의 범위를 유지하기',structure:'choose, put, finish는 try a small experiment의 구체적인 절차입니다. whether는 차이가 있는지 살피는 질문을 이끕니다.',checks:['첫 해석을 마친 뒤 메시지를 확인하는 순서를 담았나요?','개인 경험을 통제된 연구 결과와 구분했나요?'],expression:'a controlled study → 통제된 연구',natural:'nonessential messages는 모든 연락이 아니라 지금 꼭 확인할 필요가 없는 메시지입니다.'}
    ],
    search:{title:'멀티태스킹과 집중력 전환 영어 독해',description:'메시지와 영어 해석을 오가는 사례로 과제 전환 비용을 이해하는 지문입니다. 연구 결과의 범위와 부분 부정을 문단별 번역·해설로 공부하세요.',focus:'시간절·부분 부정·연구 결과의 범위'}
  },
  {
    article: {
      id:'en-packets',language:'en',category:'기술 · 인터넷의 원리',title:'A message does not travel in one piece',
      subtitle:'하나의 사진 뒤에는 잘게 나뉘어 이동하는 데이터가 있다.',minutes:10,concept:'패킷 전송과 TCP의 신뢰성',
      paragraphs:[
        'You send a photo to a friend, and it appears as one complete image on their screen. It is easy to imagine a tiny picture moving through a cable. A more useful picture is a collection of small data packets. The application presents a single photo, while the network carries the information needed to reconstruct it.',
        'A packet contains data and information used to handle that data. Think of a fictional delivery system in which a large drawing is copied onto several numbered cards. Each envelope needs a destination, and the receiver needs a way to put the contents back together. The analogy is limited: real network protocols organize information in several layers.',
        'Routers forward packets toward their destinations. Different flows share network links, instead of each conversation owning a private wire all the way across the Internet. Packets can encounter delays or be lost, and they may arrive out of order. A network that carries separate pieces therefore needs more than a simple instruction to send a whole file.',
        'One widely used transport protocol, TCP, provides applications with a reliable, ordered stream of bytes. It uses sequence information and acknowledgments to track progress, and retransmission helps recover missing data. If later data arrives first, TCP can hold it until earlier data is available. The application can then read the stream in the intended order.',
        'Not every application uses TCP. Other transport protocols make different choices, so it would be wrong to assume that every late packet is handled in exactly the same way. Even with TCP, reliability does not promise instant delivery. Waiting for missing data can add delay, and a failed connection cannot continue delivering data forever.',
        'Return to the photo on the screen. Its smooth appearance hides a process of splitting, forwarding, checking, and reassembling information. When you explain the Internet to a friend, try separating two questions: how do pieces reach a destination, and how does an application receive usable data? They are related questions, but they are not identical.'
      ],
      translation:[
        '친구에게 사진을 보내면 친구 화면에는 완성된 이미지 하나가 나타난다. 작은 사진이 케이블 안을 지나간다고 상상하기 쉽다. 하지만 작은 데이터 패킷들의 집합을 떠올리는 편이 더 유용하다. 앱은 사진 하나를 보여 주는 동안, 네트워크는 그 사진을 재구성하는 데 필요한 정보를 운반한다.',
        '패킷에는 데이터와 그 데이터를 처리하는 데 쓰는 정보가 들어 있다. 큰 그림을 번호가 매겨진 여러 카드에 나누어 옮기는 가상의 배달 시스템을 생각해 보자. 봉투마다 목적지가 필요하고, 받는 사람에게는 내용을 다시 합칠 방법이 필요하다. 다만 이 비유에는 한계가 있다. 실제 네트워크 프로토콜은 여러 계층에 걸쳐 정보를 구성한다.',
        '라우터는 패킷을 목적지 쪽으로 전달한다. 각 통신이 인터넷 끝까지 전용 전선을 차지하는 대신, 여러 데이터 흐름이 네트워크 연결 구간을 공유한다. 패킷은 지연되거나 손실될 수 있고 순서가 뒤바뀌어 도착할 수도 있다. 따라서 조각들을 운반하는 네트워크에는 파일 전체를 보내라는 단순한 지시 이상의 것이 필요하다.',
        '널리 쓰이는 전송 프로토콜 중 하나인 TCP는 앱에 신뢰할 수 있고 순서가 보장되는 바이트 흐름을 제공한다. 순서 정보와 수신 확인을 이용해 전송 상황을 추적하고, 재전송을 통해 누락된 데이터를 복구한다. 뒤의 데이터가 먼저 도착하면 TCP는 앞의 데이터가 준비될 때까지 이를 보관할 수 있다. 그러면 앱은 의도된 순서대로 데이터 흐름을 읽을 수 있다.',
        '모든 앱이 TCP를 사용하는 것은 아니다. 다른 전송 프로토콜은 다른 선택을 하므로, 늦게 도착한 모든 패킷을 정확히 같은 방식으로 처리한다고 가정하면 잘못이다. TCP에서도 신뢰성이 즉각적인 전송을 보장하지는 않는다. 누락된 데이터를 기다리느라 지연이 늘 수 있고, 실패한 연결이 데이터를 영원히 계속 전달할 수도 없다.',
        '화면의 사진으로 돌아가 보자. 매끄러운 화면 뒤에는 정보를 나누고 전달하고 확인하고 다시 조립하는 과정이 숨어 있다. 친구에게 인터넷을 설명할 때 두 질문을 나누어 보자. 조각들은 어떻게 목적지에 도달하는가? 앱은 어떻게 사용할 수 있는 데이터를 받는가? 두 질문은 관련이 있지만 같은 질문은 아니다.'
      ],
      vocabulary:[
        {term:'packet',meaning:'패킷; 네트워크로 운반되는 작은 데이터 단위',example:'A packet carries data and information used to handle it.'},
        {term:'reconstruct',meaning:'재구성하다; 다시 만들어 내다',example:'The receiver uses the data to reconstruct the image.'},
        {term:'destination',meaning:'목적지',example:'The header helps identify the packet’s destination.'},
        {term:'forward',meaning:'다음 지점으로 전달하다',example:'Routers forward packets toward their destinations.'},
        {term:'out of order',meaning:'순서가 뒤바뀐',example:'Packets may arrive out of order.'},
        {term:'acknowledgment',meaning:'수신 확인',example:'An acknowledgment helps a sender track received data.'},
        {term:'retransmission',meaning:'재전송',example:'Retransmission can help recover missing data.'},
        {term:'reliable',meaning:'신뢰할 수 있는',example:'TCP provides a reliable stream of bytes to applications.'}
      ],
      prompt:'“패킷이 도착한다”와 “앱이 순서대로 데이터를 읽는다” 사이에 어떤 처리가 필요할지 설명해 보세요.',
      sources:[
        {name:'Cloudflare Learning Center · What Is a Packet?',url:'https://www.cloudflare.com/learning/network-layer/what-is-a-packet/'},
        {name:'IETF · RFC 9293, Transmission Control Protocol',url:'https://www.rfc-editor.org/rfc/rfc9293.html'}
      ]
    },
    guides:[
      {title:'보이는 이미지와 운반되는 정보',structure:'It is easy to imagine ...에서 It은 뒤의 to부정사를 받는 가주어입니다. needed to reconstruct it은 information을 수식합니다.',checks:['사진 자체가 작은 이미지로 이동한다는 비유와 실제 데이터를 구분했나요?','it이 앞의 사진을 가리킨다는 점을 담았나요?'],expression:'in one piece → 나뉘지 않은 한 덩어리로',natural:'a more useful picture는 더 좋은 사진 파일이 아니라 이해에 도움이 되는 머릿속 그림입니다.'},
      {title:'비유와 실제 계층 구조 구분하기',structure:'in which는 fictional delivery system을 설명합니다. used to handle은 정보를 처리하는 데 쓰인다는 수동의 의미입니다.',checks:['카드 배달을 실제 인터넷의 세부 구현과 동일시하지 않았나요?','비유에는 한계가 있다는 마지막 단서를 담았나요?'],expression:'put the contents back together → 내용을 다시 합치다',natural:'layers는 종이의 층이 아니라 서로 다른 기능을 맡은 프로토콜 계층을 말합니다.'},
      {title:'가능성과 공유 구조 읽기',structure:'instead of 뒤에는 owning이라는 동명사가 옵니다. can과 may는 손실·지연·순서 변경이 가능한 상황임을 나타냅니다.',checks:['모든 패킷이 반드시 다른 경로로 간다는 주장으로 바꾸지 않았나요?','손실과 지연, 순서 변경을 구분했나요?'],expression:'arrive out of order → 순서가 뒤바뀌어 도착하다',natural:'flows는 물줄기라는 직역보다 네트워크의 데이터 흐름으로 옮기세요.'},
      {title:'TCP가 앱에 제공하는 것',structure:'provide A with B는 A에게 B를 제공한다는 뜻입니다. until은 뒤의 데이터를 보관하는 시간의 끝을 나타냅니다.',checks:['순서가 보장되는 것은 앱에 제공되는 바이트 흐름이라는 점을 담았나요?','재전송을 통한 누락 데이터 복구를 옮겼나요?'],expression:'in the intended order → 의도된 순서대로',natural:'acknowledgments는 감사 인사가 아니라 데이터 수신을 확인하는 통신 정보입니다.'},
      {title:'Not every와 신뢰성의 한계',structure:'Not every application은 모든 앱이 그런 것은 아니라는 부분 부정입니다. Even with TCP는 TCP를 써도 남는 한계를 소개합니다.',checks:['모든 전송이 TCP를 따른다는 뜻으로 일반화하지 않았나요?','신뢰성을 즉시 도착한다는 보장과 구분했나요?'],expression:'does not promise instant delivery → 즉각적인 전달을 보장하지 않는다',natural:'a failed connection은 성능이 조금 낮은 연결이 아니라 통신을 계속할 수 없게 된 연결입니다.'},
      {title:'서로 관련되지만 다른 두 질문',structure:'a process of 뒤에는 네 동명사가 병렬로 이어집니다. how로 시작하는 두 질문은 도달과 앱의 수신을 구분합니다.',checks:['전달 과정과 앱에 쓸 수 있는 형태로 제공하는 과정을 나눴나요?','related와 identical의 차이를 살렸나요?'],expression:'usable data → 사용할 수 있는 데이터',natural:'smooth appearance는 사진 표면의 촉감보다 사용자가 느끼는 매끄러운 표시를 가리킵니다.'}
    ],
    search:{title:'인터넷 패킷과 TCP 원리 영어 독해',description:'사진이 작은 데이터 패킷으로 이동하는 과정을 설명하는 영어 지문입니다. TCP의 순서·재전송과 한계를 문단별 참고 해석, 구문 해설, 단어로 배웁니다.',focus:'수동 수식·가능성·부분 부정'}
  },
  {
    article: {
      id:'en-https',language:'en',category:'기술 · 웹과 보안',title:'What a secure connection can promise',
      subtitle:'통신을 보호하는 일과 사이트를 믿어도 되는지는 다른 질문이다.',minutes:10,concept:'HTTPS의 암호화·무결성·인증',
      paragraphs:[
        'Imagine sending a private note across a crowded room. Anyone who carries an open sheet could read it. Now imagine a system that protects the note so that people along the route cannot simply read or silently change its contents. This is an imperfect analogy, but it introduces a question that matters on the web: what happens between your browser and a server?',
        'HTTPS uses Transport Layer Security, or TLS, to protect that connection. Encryption makes the exchanged data unreadable to someone who intercepts it without the required keys. Integrity protection helps detect changes made during transmission. Server authentication helps the browser check that it is communicating with the server for the domain it intended to reach.',
        'Before protected application data is exchanged, the browser and server perform a handshake. They establish the security settings and keys needed for the connection. The browser normally checks a server certificate as part of authentication. You do not type a new secret into every page to make this process happen; much of the work is handled by the software.',
        'However, protecting the route does not decide whether the destination deserves your trust. A dishonest website can also use HTTPS. If you enter a private note into that site, its operator may be able to read what you submit. Encryption in transit does not prevent the intended recipient from receiving the information you chose to send.',
        'Consider a fictional shop with a correctly protected connection but a misleading offer. The connection can protect the order details as they travel, while the offer remains misleading. A useful check therefore includes the domain, the nature of the request, and whether you have a reason to trust the organization. Connection security answers only part of that larger question.',
        'When you next see an HTTPS address, try describing its meaning precisely. It provides important protection for data moving between your browser and the server, when the connection is correctly established. It is not a promise that every statement on the page is true. Understanding both the protection and its boundary makes the signal more useful.'
      ],
      translation:[
        '사람이 많은 방을 가로질러 사적인 메모를 보낸다고 상상해 보자. 펼쳐진 종이를 나르는 사람은 누구나 내용을 읽을 수 있다. 이제 경로에 있는 사람들이 내용을 쉽게 읽거나 몰래 바꿀 수 없도록 메모를 보호하는 시스템을 상상해 보자. 완벽한 비유는 아니지만 웹에서 중요한 질문을 소개한다. 브라우저와 서버 사이에서는 무슨 일이 일어날까?',
        'HTTPS는 TLS, 즉 전송 계층 보안을 이용해 그 연결을 보호한다. 암호화는 필요한 키 없이 데이터를 가로챈 사람이 주고받는 내용을 읽을 수 없게 만든다. 무결성 보호는 전송 중 변경을 감지하도록 돕는다. 서버 인증은 브라우저가 접속하려던 도메인에 해당하는 서버와 통신하는지 확인하도록 돕는다.',
        '보호되는 앱 데이터를 주고받기 전에 브라우저와 서버는 핸드셰이크를 수행한다. 연결에 필요한 보안 설정과 키를 마련하는 과정이다. 브라우저는 보통 인증 과정에서 서버 인증서를 확인한다. 이 과정을 실행하려고 페이지마다 새로운 비밀을 입력할 필요는 없다. 많은 부분을 소프트웨어가 처리한다.',
        '하지만 경로를 보호한다고 해서 목적지가 신뢰할 만한지는 결정되지 않는다. 부정직한 웹사이트도 HTTPS를 사용할 수 있다. 그런 사이트에 사적인 메모를 입력하면 운영자가 제출한 내용을 읽을 수 있다. 전송 중 암호화가 자신이 보내기로 한 정보를 원래 수신자가 받는 것까지 막아 주지는 않는다.',
        '연결은 올바르게 보호되지만 오해를 부르는 제안을 하는 가상의 상점을 생각해 보자. 연결은 주문 정보가 이동하는 동안 이를 보호할 수 있지만 제안 자체는 여전히 사람을 오도한다. 따라서 유용한 점검에는 도메인과 요청의 성격, 그 조직을 신뢰할 이유가 있는지가 포함된다. 연결 보안은 더 큰 질문의 일부에만 답한다.',
        '다음에 HTTPS 주소를 보면 그 의미를 정확히 설명해 보자. 연결이 올바르게 이루어졌을 때 브라우저와 서버 사이를 이동하는 데이터를 중요하게 보호한다. 페이지의 모든 주장이 사실이라는 보장은 아니다. 보호 기능과 그 경계를 함께 이해하면 이 표시를 더 유용하게 활용할 수 있다.'
      ],
      vocabulary:[
        {term:'encrypt',meaning:'암호화하다',example:'TLS encrypts data exchanged over the connection.'},
        {term:'intercept',meaning:'중간에서 가로채다',example:'An attacker may try to intercept network traffic.'},
        {term:'integrity',meaning:'무결성; 데이터가 몰래 변경되지 않았음을 확인할 수 있는 성질',example:'Integrity protection helps detect changes in transit.'},
        {term:'authentication',meaning:'인증; 주장한 신원을 확인하는 절차',example:'Server authentication is part of a secure connection.'},
        {term:'certificate',meaning:'인증서',example:'The browser checks the server certificate.'},
        {term:'in transit',meaning:'전송 중에; 이동 중에',example:'HTTPS protects information in transit.'},
        {term:'recipient',meaning:'수신자; 받는 사람',example:'The intended recipient can receive the submitted message.'},
        {term:'misleading',meaning:'오해를 불러일으키는',example:'A misleading offer can appear on an HTTPS website.'}
      ],
      prompt:'HTTPS가 보호하는 것 한 가지와, HTTPS만으로 판단할 수 없는 것 한 가지를 구분해 보세요.',
      sources:[
        {name:'MDN Web Docs · Transport Layer Security',url:'https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security'},
        {name:'Cloudflare Learning Center · What Is HTTPS?',url:'https://www.cloudflare.com/learning/ssl/what-is-https/'}
      ]
    },
    guides:[
      {title:'조건과 불완전한 비유 읽기',structure:'Anyone who carries ...에서 who 절은 사람의 조건을 설명합니다. so that은 메모를 보호하는 목적을 이끕니다.',checks:['메모 배달을 실제 TLS 방식과 똑같다고 옮기지 않았나요?','보호 대상이 브라우저와 서버 사이의 과정이라는 질문을 살렸나요?'],expression:'along the route → 경로를 따라 있는',natural:'an open sheet는 공개된 문서라는 뜻보다 펼쳐져 내용이 드러난 종이를 말합니다.'},
      {title:'세 가지 보호 기능 구분하기',structure:'makes the exchanged data unreadable은 make+목적어+형용사 구조입니다. it intended to reach는 domain을 수식합니다.',checks:['암호화·무결성·서버 인증을 서로 다른 기능으로 옮겼나요?','intercepts it에서 it이 주고받는 데이터를 가리킨다고 이해했나요?'],expression:'detect changes made during transmission → 전송 중 이루어진 변경을 감지하다',natural:'keys는 키보드의 키가 아니라 암호 처리에 필요한 키 정보입니다.'},
      {title:'수동태와 통신의 준비 과정',structure:'Before ... is exchanged는 데이터 교환 이전을 나타내는 수동태 시간절입니다. as part of는 전체 절차의 일부임을 나타냅니다.',checks:['핸드셰이크가 보호된 데이터 교환을 준비하는 과정이라고 옮겼나요?','모든 페이지에서 사용자가 별도 비밀을 입력한다는 뜻으로 바꾸지 않았나요?'],expression:'establish the security settings → 보안 설정을 마련하다',natural:'handshake는 실제 악수가 아니라 통신을 시작하기 위한 상호 교환 절차입니다.'},
      {title:'보호 경로와 신뢰할 목적지',structure:'whether는 신뢰할 만한지라는 판단 내용을 이끕니다. prevent A from -ing는 A가 어떤 행동을 하는 것을 막는다는 구조입니다.',checks:['HTTPS를 사용해도 운영자가 제출 내용을 받을 수 있다는 점을 담았나요?','전송 중 보호를 수신자의 접근 차단과 구분했나요?'],expression:'deserve your trust → 신뢰할 만하다',natural:'the intended recipient는 몰래 가로챈 사람이 아니라 원래 보내려던 상대입니다.'},
      {title:'while의 대조와 점검 범위',structure:'with ... but ...은 상점이 가진 두 특성을 연결합니다. while은 안전한 전송과 오도하는 제안이 동시에 성립함을 보여 줍니다.',checks:['가상 상점의 사례임을 유지했나요?','연결 보안이 신뢰 판단의 일부라는 결론을 담았나요?'],expression:'the nature of the request → 요청의 성격',natural:'nature는 자연환경이 아니라 무엇을 왜 요구하는지에 관한 본질이나 성격입니다.'},
      {title:'조건을 붙여 의미를 정확히 말하기',structure:'when the connection is correctly established는 보호가 성립하는 조건입니다. both A and B는 보호와 그 경계를 함께 연결합니다.',checks:['정상적으로 성립한 연결이라는 조건을 빠뜨리지 않았나요?','페이지 내용의 진실성까지 보장한다고 확대하지 않았나요?'],expression:'understand its boundary → 그 한계를 이해하다',natural:'signal은 여기서 무선 신호라기보다 HTTPS라는 주소가 알려 주는 표시입니다.'}
    ],
    search:{title:'HTTPS 암호화와 웹 보안 영어 독해',description:'HTTPS의 암호화·무결성·인증과 보호 범위를 배우는 영어 지문입니다. 안전한 연결과 사이트 신뢰를 구분하며 문단별 번역·구문·핵심 단어를 공부하세요.',focus:'사역 구조·수동태·조건과 대조'}
  },
  {
    article: {
      id:'en-moon-phases',language:'en',category:'과학 · 하늘을 읽는 법',title:'The Moon changes its appearance, not its shape',
      subtitle:'달의 밝은 부분이 달라 보이는 이유는 빛과 시선의 관계에 있다.',minutes:9,concept:'달의 위상과 관측 방향',
      paragraphs:[
        'Imagine keeping a small sky notebook for a month. On one evening, you draw a narrow crescent. Later, you draw a half circle, and another night brings a bright disk. Your drawings change, although the Moon has not turned into different objects. What changes is the part of its sunlit surface that faces our view.',
        'The Moon does not produce the light we call moonlight; it reflects sunlight. Except during a lunar eclipse, the Sun illuminates roughly half of the Moon at a time. As the Moon moves around Earth, we see different amounts of that illuminated half. These changing appearances are called phases. A crescent is not a piece that has broken away.',
        'A simple model can help. Imagine a ball lit by a lamp in an otherwise dark room. From one position, much of the bright side faces you. From another, you see only a narrow bright part. The ball stays round. This model leaves out many details of the real sky, but it separates the source of light from the observer’s viewpoint.',
        'At a new moon, the side facing Earth is mostly dark. Around a full moon, we see nearly the whole sunlit face. The familiar phases are not normally caused by Earth’s shadow falling across the Moon. That shadow is involved in a lunar eclipse, which requires a more particular alignment of the Sun, Earth, and Moon.',
        'There is another useful distinction. The Moon keeps approximately the same face toward Earth, but that face is not always fully lit. The far side also has periods of sunlight and darkness. Calling it a permanently dark side therefore creates a misleading picture. Which side faces us and which side receives sunlight are different questions.',
        'Return to your imagined notebook. Instead of drawing only a bright shape, add a note about what your drawing represents: a view of sunlight on a round object. You do not need to memorize every phase name immediately. Start with the relationship among light, motion, and viewpoint. The changing sky becomes easier to explain when those ideas stay separate.'
      ],
      translation:[
        '한 달 동안 작은 하늘 관찰 노트를 쓴다고 상상해 보자. 어느 저녁에는 가느다란 초승달을 그리고, 나중에는 반원을 그리고, 또 다른 밤에는 밝은 원반을 그린다. 달이 다른 물체로 변한 것은 아닌데 그림은 달라진다. 변하는 것은 햇빛을 받는 표면 중 우리 시야에 들어오는 부분이다.',
        '달은 우리가 달빛이라고 부르는 빛을 스스로 만들지 않고 햇빛을 반사한다. 월식 때를 제외하면 태양은 한 번에 달의 대략 절반을 비춘다. 달이 지구 주위를 움직이는 동안 그 밝은 절반이 보이는 비율이 달라진다. 이렇게 달라 보이는 모습을 위상이라고 한다. 초승달은 달에서 떨어져 나온 조각이 아니다.',
        '간단한 모형이 도움이 될 수 있다. 나머지는 어두운 방에서 전등이 비추는 공을 상상해 보자. 한 위치에서는 밝은 쪽의 많은 부분이 자신을 향하고, 다른 위치에서는 가느다란 밝은 부분만 보인다. 공은 계속 둥글다. 이 모형은 실제 하늘의 많은 세부 사항을 생략하지만 빛의 근원과 관찰자의 시점을 구분해 준다.',
        '삭 무렵에는 지구를 향한 쪽이 대부분 어둡다. 보름달 무렵에는 햇빛을 받는 면이 거의 전부 보인다. 익숙한 달의 위상이 보통 지구의 그림자가 달에 드리워져 생기는 것은 아니다. 그 그림자가 관련되는 현상은 월식으로, 태양과 지구와 달이 더 특정한 방식으로 정렬되어야 한다.',
        '한 가지 더 유용하게 구분할 수 있다. 달은 대략 같은 면을 지구 쪽으로 향하지만 그 면 전체가 늘 밝은 것은 아니다. 뒷면에도 햇빛을 받는 기간과 어두운 기간이 있다. 따라서 뒷면을 영원히 어두운 면이라고 부르면 잘못된 그림을 떠올리게 된다. 우리를 향한 면이 무엇인지와 햇빛을 받는 면이 무엇인지는 다른 질문이다.',
        '상상 속 관찰 노트로 돌아가 보자. 밝은 모양만 그리는 대신, 둥근 물체에 비친 햇빛을 바라본 모습이라는 설명을 덧붙여 보자. 모든 위상 이름을 곧바로 외울 필요는 없다. 빛과 움직임, 관찰 방향의 관계부터 시작하자. 이 개념들을 구분하면 달라지는 하늘을 더 쉽게 설명할 수 있다.'
      ],
      vocabulary:[
        {term:'crescent',meaning:'초승달 또는 그믐달 모양의 가느다란 달',example:'A narrow crescent appeared in the evening sky.'},
        {term:'reflect',meaning:'빛을 반사하다',example:'The Moon reflects sunlight.'},
        {term:'illuminate',meaning:'빛을 비추다',example:'The lamp illuminates one side of the ball.'},
        {term:'phase',meaning:'위상; 달이 달라 보이는 단계',example:'The full moon is one phase in the cycle.'},
        {term:'viewpoint',meaning:'관찰 위치; 시점',example:'The bright shape changes with the observer’s viewpoint.'},
        {term:'lunar eclipse',meaning:'월식',example:'Earth’s shadow is involved in a lunar eclipse.'},
        {term:'alignment',meaning:'일렬 또는 특정한 방향으로의 정렬',example:'An eclipse requires a particular alignment.'},
        {term:'permanently',meaning:'영구적으로; 계속해서',example:'The far side is not permanently dark.'}
      ],
      prompt:'달의 뒷면과 달의 어두운 면이 같은 개념이 아닌 이유를 설명해 보세요.',
      sources:[
        {name:'NASA Space Place · What Are the Moon’s Phases?',url:'https://spaceplace.nasa.gov/moon-phases/en/'},
        {name:'NASA Science · Moonlight',url:'https://science.nasa.gov/moon/moonlight/'}
      ]
    },
    guides:[
      {title:'겉모습과 물체 자체의 변화',structure:'although는 그림이 달라도 달 자체가 변한 것은 아니라는 양보를 나타냅니다. What changes는 “변하는 것”이라는 명사절입니다.',checks:['달이 실제로 다른 모양의 물체가 된다는 뜻으로 옮기지 않았나요?','변하는 것이 햇빛을 받는 부분의 보이는 범위라는 점을 담았나요?'],expression:'a narrow crescent → 가느다란 초승달 모양',natural:'bright disk는 컴퓨터 디스크가 아니라 원반처럼 보이는 밝은 달을 뜻합니다.'},
      {title:'반사된 빛과 위상 정의',structure:'Except during ...은 일반 설명의 예외를 밝힙니다. As the Moon moves ...는 달의 이동에 따라 관측이 달라짐을 나타냅니다.',checks:['달빛이 햇빛의 반사라는 뜻을 옮겼나요?','roughly half와 different amounts를 각각 구분했나요?'],expression:'the illuminated half → 빛을 받는 절반',natural:'phases는 달 자체가 조각나는 단계가 아니라 달이 달라 보이는 모습입니다.'},
      {title:'모형이 보여 주는 것과 생략하는 것',structure:'lit by a lamp는 ball을 수식하는 수동 표현입니다. otherwise dark는 전등빛을 제외하면 어둡다는 뜻입니다.',checks:['관찰 위치가 달라져도 공은 둥글게 남는다고 옮겼나요?','간단한 모형이 실제 하늘의 모든 세부를 담지는 않는다는 단서를 살렸나요?'],expression:'the observer’s viewpoint → 관찰자의 시점',natural:'from another에서는 position이 생략되어 다른 위치에서 본다는 뜻입니다.'},
      {title:'달의 위상과 월식 구분하기',structure:'the side facing Earth에서 facing은 side를 수식합니다. are not normally caused by는 보통의 위상이 그 원인으로 생기지 않는다는 뜻입니다.',checks:['new moon을 달이 새로 생기는 현상으로 옮기지 않았나요?','일상적인 위상 변화와 지구 그림자가 만드는 월식을 구분했나요?'],expression:'a particular alignment → 특정한 정렬',natural:'new moon은 삭이며, 가느다란 초승달이 보이는 때와는 구분합니다.'},
      {title:'같은 면과 밝은 면은 다른 기준',structure:'keeps ... toward Earth는 지구를 향한 면의 관계를 나타냅니다. not always fully lit는 언제나 완전히 밝지는 않다는 부분 부정입니다.',checks:['달의 뒷면에도 낮과 밤이 있다는 뜻을 담았나요?','지구를 향함과 햇빛을 받음을 같은 뜻으로 옮기지 않았나요?'],expression:'a permanently dark side → 영원히 어두운 면',natural:'approximately the same face는 작은 차이를 무시하고 늘 정확히 같은 부분만 보인다고 단정하는 표현이 아닙니다.'},
      {title:'모양 관찰에서 관계 이해로',structure:'Instead of drawing ...은 대체할 행동을 제안합니다. among은 빛·움직임·시점이라는 세 요소 사이의 관계를 연결합니다.',checks:['위상 이름을 모두 당장 외워야 한다는 뜻으로 바꾸지 않았나요?','관찰 그림이 둥근 물체 위의 빛을 본 모습이라는 점을 살렸나요?'],expression:'keep those ideas separate → 그 개념들을 구분하다',natural:'separate는 세 요소가 무관하다는 뜻이 아니라 서로 다른 역할을 구별하라는 뜻입니다.'}
    ],
    search:{title:'달의 위상과 달빛 원리 영어 독해',description:'초승달과 보름달이 다르게 보이는 이유를 빛과 관측 방향으로 설명하는 영어 지문입니다. 달의 뒷면·월식을 구분하며 문단별 해석·구문·단어를 배웁니다.',focus:'명사절·분사 수식·양보와 예외'}
  },
  {
    article: {
      id:'en-urban-heat',language:'en',category:'환경 · 도시의 기후',title:'Why the city stays warm after sunset',
      subtitle:'같은 도시 안에서도 거리의 재료와 그늘은 다르다.',minutes:9,concept:'도시 열섬과 온도 측정의 차이',
      paragraphs:[
        'Imagine walking home after sunset. A street beside a large paved parking area still feels warm, while a nearby green space feels cooler. This imagined walk does not measure a whole city, but it raises a useful question. Why can places under the same evening sky have different temperatures, even after direct sunlight has disappeared?',
        'Cities contain roofs, roads, and walls that absorb solar energy and later release heat. Buildings and streets can also change the movement of air. When an urban area is warmer than nearby outlying areas, the difference is called an urban heat island. Several factors combine to produce it; the effect is not simply a matter of how crowded a street looks.',
        'Vegetation changes the local environment in more than one way. A tree can shade a surface, reducing the sunlight that reaches it. Plants also release water vapor through transpiration, which can help cool their surroundings. These processes differ from painting a roof a lighter color, although both vegetation and reflective surfaces can play a role in reducing urban heat.',
        'Measuring the difference requires care. A very hot pavement surface and the air above it are not the same measurement. A map based on surface temperatures cannot automatically tell you the air temperature at a person’s height. Time of day, weather, location, and the kind of measurement all affect what a comparison can reasonably show.',
        'Consider a fictional neighborhood choosing where to add shade. One group counts trees, while another asks where people wait for buses and walk to school. Both kinds of information may matter. The goal is not merely to improve a number on a map, but to understand which places people use and how the proposed changes could affect those places.',
        'On your next evening walk, notice the materials and shade around you. Treat that observation as a question, not proof of an exact temperature difference. To compare locations fairly, you would need suitable measurements under comparable conditions. A familiar street can become the beginning of an investigation into how a city stores, releases, and manages heat.'
      ],
      translation:[
        '해가 진 뒤 집으로 걸어간다고 상상해 보자. 넓게 포장된 주차장 옆 거리는 여전히 따뜻하게 느껴지지만 가까운 녹지는 더 시원하게 느껴진다. 이 가상의 산책이 도시 전체를 측정하는 것은 아니지만 유용한 질문을 던진다. 직접적인 햇빛이 사라진 뒤에도 같은 저녁 하늘 아래의 장소들이 왜 서로 다른 온도를 보일 수 있을까?',
        '도시에는 태양 에너지를 흡수했다가 나중에 열을 방출하는 지붕과 도로, 벽이 있다. 건물과 거리의 배치는 공기의 움직임도 바꿀 수 있다. 도심이 주변 외곽 지역보다 따뜻한 현상을 도시 열섬이라고 한다. 여러 요인이 결합해 만들며, 단순히 거리가 얼마나 붐비는가의 문제는 아니다.',
        '식생은 한 가지 이상의 방식으로 주변 환경을 바꾼다. 나무는 표면에 그늘을 드리워 도달하는 햇빛을 줄일 수 있다. 식물은 증산 작용으로 수증기를 내보내 주변을 식히는 데 도움을 줄 수도 있다. 이 과정들은 지붕을 더 밝은 색으로 칠하는 것과 다르지만 식생과 반사율이 높은 표면 모두 도시의 열을 줄이는 데 역할을 할 수 있다.',
        '그 차이를 측정하려면 주의가 필요하다. 매우 뜨거운 포장면의 온도와 그 위 공기의 온도는 같은 측정값이 아니다. 표면 온도로 만든 지도가 사람 키 높이의 기온을 자동으로 알려 주지는 않는다. 시간대와 날씨, 위치, 측정 종류에 따라 비교로 합리적으로 보여 줄 수 있는 내용이 달라진다.',
        '그늘을 어디에 늘릴지 정하는 가상의 동네를 생각해 보자. 한 집단은 나무 수를 세고, 다른 집단은 사람들이 버스를 기다리고 학교에 걸어가는 장소를 살핀다. 두 종류의 정보 모두 중요할 수 있다. 목표는 지도의 숫자만 개선하는 것이 아니라 사람들이 어떤 장소를 이용하고 제안한 변화가 그곳에 어떤 영향을 줄지 이해하는 것이다.',
        '다음 저녁 산책에서는 주변의 재료와 그늘을 살펴보자. 그 관찰은 정확한 온도 차이의 증거가 아니라 질문으로 받아들이자. 장소를 공정하게 비교하려면 서로 비교할 만한 조건에서 적절히 측정해야 한다. 익숙한 거리는 도시가 어떻게 열을 저장하고 방출하고 관리하는지 알아보는 탐구의 출발점이 될 수 있다.'
      ],
      vocabulary:[
        {term:'paved',meaning:'포장된',example:'The paved area has little shade.'},
        {term:'absorb',meaning:'흡수하다',example:'Urban surfaces can absorb solar energy.'},
        {term:'release',meaning:'방출하다; 내보내다',example:'The road releases stored heat after sunset.'},
        {term:'vegetation',meaning:'식생; 특정 지역에 자라는 식물',example:'Vegetation can change the local environment.'},
        {term:'transpiration',meaning:'증산 작용; 식물이 수증기를 내보내는 과정',example:'Plants release water vapor through transpiration.'},
        {term:'reflective',meaning:'반사하는; 반사율이 높은',example:'A reflective roof can reduce absorbed solar energy.'},
        {term:'measurement',meaning:'측정; 측정값',example:'A surface measurement differs from an air measurement.'},
        {term:'comparable',meaning:'서로 비교할 만한',example:'Compare the locations under comparable conditions.'}
      ],
      prompt:'우리 동네에서 그늘이 필요한 장소 하나를 고르고, 판단에 필요한 관찰과 측정 자료를 구분해 보세요.',
      sources:[
        {name:'US EPA · What Are Heat Islands?',url:'https://www.epa.gov/heatislands/what-are-heat-islands'},
        {name:'US EPA · Measuring Heat Islands',url:'https://www.epa.gov/heatislands/measuring-heat-islands'},
        {name:'US EPA · Using Trees and Vegetation to Reduce Heat Islands',url:'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands'}
      ]
    },
    guides:[
      {title:'관찰 사례와 측정 결과 구분하기',structure:'while은 두 장소에서 느낀 온기를 대조합니다. even after는 햇빛이 사라진 뒤에도 차이가 남을 수 있다는 의미입니다.',checks:['가상 산책의 느낌을 도시 전체의 실측 결과로 바꾸지 않았나요?','해가 진 뒤라는 시간 조건을 살렸나요?'],expression:'direct sunlight → 직접적인 햇빛',natural:'feels cooler는 실제 온도를 정확히 측정했다는 말보다 더 시원하게 느껴진다는 표현입니다.'},
      {title:'열의 흡수·방출과 여러 원인',structure:'that absorb ... and later release ...는 지붕·도로·벽을 수식합니다. When 절은 열섬이라고 부르는 조건을 나타냅니다.',checks:['열을 흡수하는 때와 나중에 방출하는 때를 구분했나요?','열섬의 원인을 사람 수 하나로만 좁히지 않았나요?'],expression:'outlying areas → 외곽 지역',natural:'a matter of how crowded ...는 거리가 붐비는 정도만의 문제라는 뜻으로, 앞의 not simply와 함께 읽어야 합니다.'},
      {title:'두 냉각 방식과 양보절',structure:'reducing ...은 그늘이 만드는 결과를 설명합니다. although는 방식은 달라도 두 요소가 역할을 할 수 있다는 양보입니다.',checks:['그늘과 증산 작용을 서로 다른 과정으로 옮겼나요?','밝은 지붕과 식생이 같은 원리라고 단정하지 않았나요?'],expression:'play a role in reducing heat → 열을 줄이는 데 역할을 하다',natural:'vegetation은 채소만이 아니라 그 지역에 자라는 식물을 통틀어 말합니다.'},
      {title:'표면 온도와 기온 구분하기',structure:'based on surface temperatures는 map을 수식합니다. what a comparison can ... show는 affect의 목적어인 명사절입니다.',checks:['포장면 온도를 사람 높이의 기온과 동일하게 옮기지 않았나요?','측정 시점과 종류가 비교에 영향을 준다는 조건을 담았나요?'],expression:'at a person’s height → 사람의 키 높이에서',natural:'requires care는 돌봄이 필요한 대상이라는 뜻보다 측정할 때 주의해야 한다는 뜻입니다.'},
      {title:'not merely A, but B의 확장',structure:'while은 두 집단이 살피는 정보를 대조합니다. not merely ... but ...은 숫자 개선을 넘어 실제 이용 장소를 이해하는 목표를 연결합니다.',checks:['나무 수와 사람들의 이용 장소 정보가 모두 중요할 수 있다고 옮겼나요?','제안한 변화의 영향이 확정되었다고 쓰지 않았나요?'],expression:'the proposed changes → 제안된 변화',natural:'shade는 그림자라는 명사 뜻뿐 아니라 햇빛을 피할 수 있는 그늘 공간으로 이해하세요.'},
      {title:'관찰에서 검증 가능한 질문으로',structure:'Treat A as B는 A를 B로 받아들이라는 뜻입니다. To compare ...는 적절한 측정이 필요한 목적을 나타냅니다.',checks:['느낌만으로 정확한 온도 차이를 증명한다고 옮기지 않았나요?','비교 가능한 조건 아래의 측정이 필요하다는 뜻을 담았나요?'],expression:'under comparable conditions → 서로 비교할 만한 조건에서',natural:'investigation은 여기서 범죄 수사가 아니라 도시 열을 알아보는 탐구입니다.'}
    ],
    search:{title:'도시 열섬과 그늘의 효과 영어 독해',description:'해가 진 뒤에도 도시가 따뜻한 이유와 나무의 냉각 작용을 읽는 영어 지문입니다. 표면 온도·기온의 차이와 문단별 참고 해석·구문·단어를 제공합니다.',focus:'관계절·양보·측정과 관찰 구분'}
  }
];
