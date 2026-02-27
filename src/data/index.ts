import type {
  Badge,
  Favorite,
  LearningPet,
  Lesson,
  LessonContent,
  StudyStats,
  Textbook,
  UserLevel,
} from '../types';

// 教材数据
export const textbooks: Textbook[] = [
  {
    id: 'power-up-1',
    title: 'Power Up 1',
    level: 'L1-L3',
    cover: '📘',
    totalLessons: 9,
    description: '适合英语初学者的基础教材，从字母发音到简单对话',
  },
  {
    id: 'power-up-2',
    title: 'Power Up 2',
    level: 'L3-L5',
    cover: '📗',
    totalLessons: 9,
    description: '适合进阶学习者的教材，提升语法和词汇量',
  },
];

// 课程单元数据
export const lessons: Lesson[] = [
  // Power Up 1 Units
  {
    id: 'pu1-u1',
    textbookId: 'power-up-1',
    title: 'Hello!',
    unitNumber: 1,
    pageRange: '4-7',
    thumbnail: '👋',
    status: 'completed',
    starsEarned: 3,
    maxStars: 3,
  },
  {
    id: 'pu1-u2',
    textbookId: 'power-up-1',
    title: 'My Family',
    unitNumber: 2,
    pageRange: '8-11',
    thumbnail: '👨‍👩‍👧‍👦',
    status: 'completed',
    starsEarned: 3,
    maxStars: 3,
  },
  {
    id: 'pu1-u3',
    textbookId: 'power-up-1',
    title: 'At School',
    unitNumber: 3,
    pageRange: '12-15',
    thumbnail: '🏫',
    status: 'completed',
    starsEarned: 2,
    maxStars: 3,
  },
  {
    id: 'pu1-u4',
    textbookId: 'power-up-1',
    title: 'My Toys',
    unitNumber: 4,
    pageRange: '16-19',
    thumbnail: '🧸',
    status: 'in-progress',
    starsEarned: 1,
    maxStars: 3,
  },
  {
    id: 'pu1-u5',
    textbookId: 'power-up-1',
    title: 'Food',
    unitNumber: 5,
    pageRange: '20-23',
    thumbnail: '🍎',
    status: 'in-progress',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu1-u6',
    textbookId: 'power-up-1',
    title: 'Animals',
    unitNumber: 6,
    pageRange: '24-27',
    thumbnail: '🦁',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu1-u7',
    textbookId: 'power-up-1',
    title: 'Colors',
    unitNumber: 7,
    pageRange: '28-31',
    thumbnail: '🎨',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu1-u8',
    textbookId: 'power-up-1',
    title: 'Numbers',
    unitNumber: 8,
    pageRange: '32-35',
    thumbnail: '🔢',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu1-u9',
    textbookId: 'power-up-1',
    title: 'Weather',
    unitNumber: 9,
    pageRange: '36-39',
    thumbnail: '☀️',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  // Power Up 2 Units
  {
    id: 'pu2-u1',
    textbookId: 'power-up-2',
    title: 'Hobbies',
    unitNumber: 1,
    pageRange: '4-7',
    thumbnail: '🎯',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u2',
    textbookId: 'power-up-2',
    title: 'Travel',
    unitNumber: 2,
    pageRange: '8-11',
    thumbnail: '✈️',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u3',
    textbookId: 'power-up-2',
    title: 'Sports',
    unitNumber: 3,
    pageRange: '12-15',
    thumbnail: '⚽',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u4',
    textbookId: 'power-up-2',
    title: 'Healthy Eating',
    unitNumber: 4,
    pageRange: '16-19',
    thumbnail: '🥗',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u5',
    textbookId: 'power-up-2',
    title: 'Nature',
    unitNumber: 5,
    pageRange: '20-23',
    thumbnail: '🌳',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u6',
    textbookId: 'power-up-2',
    title: 'Science',
    unitNumber: 6,
    pageRange: '24-27',
    thumbnail: '🔬',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u7',
    textbookId: 'power-up-2',
    title: 'Technology',
    unitNumber: 7,
    pageRange: '28-31',
    thumbnail: '💻',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u8',
    textbookId: 'power-up-2',
    title: 'Culture',
    unitNumber: 8,
    pageRange: '32-35',
    thumbnail: '🌍',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
  {
    id: 'pu2-u9',
    textbookId: 'power-up-2',
    title: 'Future Plans',
    unitNumber: 9,
    pageRange: '36-39',
    thumbnail: '🚀',
    status: 'locked',
    starsEarned: 0,
    maxStars: 3,
  },
];

// 课程内容数据
export const lessonContents: LessonContent[] = [
  // Power Up 1 - Unit 1: Hello!
  {
    id: 'pu1-u1-p1',
    lessonId: 'pu1-u1',
    pageNumber: 4,
    englishText: `Hello! My name is Tom.
Hi! I'm Lucy.
Good morning! How are you?
I'm fine, thank you.`,
    chineseText: `你好！我的名字是汤姆。
你好！我是露西。
早上好！你好吗？
我很好，谢谢。`,
    words: [
      { word: 'hello', translation: '你好', pronunciation: '/həˈloʊ/' },
      { word: 'name', translation: '名字', pronunciation: '/neɪm/' },
      { word: 'morning', translation: '早上', pronunciation: '/ˈmɔːrnɪŋ/' },
      { word: 'fine', translation: '好的', pronunciation: '/faɪn/' },
    ],
  },
  {
    id: 'pu1-u1-p2',
    lessonId: 'pu1-u1',
    pageNumber: 5,
    englishText: `Song: Hello Song
Hello, hello, how are you?
I'm happy, I'm happy, how about you?
Hello, hello, how are you?
I'm great, I'm great, how about you?`,
    chineseText: `歌曲：你好歌
你好，你好，你好吗？
我很开心，我很开心，你呢？
你好，你好，你好吗？
我很好，我很好，你呢？`,
    words: [
      { word: 'happy', translation: '开心的', pronunciation: '/ˈhæpi/' },
      { word: 'great', translation: '很棒的', pronunciation: '/ɡreɪt/' },
      { word: 'how about', translation: '...怎么样', pronunciation: '/haʊ əˈbaʊt/' },
    ],
  },
  {
    id: 'pu1-u1-p3',
    lessonId: 'pu1-u1',
    pageNumber: 6,
    englishText: `Grammar: Be动词
I am (I'm)
You are (You're)
He/She is (He's/She's)

Examples:
I am happy. → I'm happy.
You are great. → You're great.
She is fine. → She's fine.`,
    chineseText: `语法：Be动词
我是 (I'm)
你是 (You're)
他/她是 (He's/She's)

例句：
我是开心的。 → 我很开心。
你很棒。 → 你很棒。
她很好。 → 她很好。`,
    words: [
      { word: 'am', translation: '是', pronunciation: '/æm/' },
      { word: 'are', translation: '是', pronunciation: '/ɑːr/' },
      { word: 'is', translation: '是', pronunciation: '/ɪz/' },
    ],
  },

  // Power Up 1 - Unit 2: My Family
  {
    id: 'pu1-u2-p1',
    lessonId: 'pu1-u2',
    pageNumber: 8,
    englishText: `This is my family.
This is my father. He is tall.
This is my mother. She is kind.
This is my brother. He is fun.
This is my sister. She is cute.`,
    chineseText: `这是我的家庭。
这是我的爸爸。他很高。
这是我的妈妈。她很善良。
这是我的哥哥/弟弟。他很有趣。
这是我的姐姐/妹妹。她很可爱。`,
    words: [
      { word: 'family', translation: '家庭', pronunciation: '/ˈfæməli/' },
      { word: 'father', translation: '爸爸', pronunciation: '/ˈfɑːðər/' },
      { word: 'mother', translation: '妈妈', pronunciation: '/ˈmʌðər/' },
      { word: 'brother', translation: '兄弟', pronunciation: '/ˈbrʌðər/' },
      { word: 'sister', translation: '姐妹', pronunciation: '/ˈsɪstər/' },
    ],
  },
  {
    id: 'pu1-u2-p2',
    lessonId: 'pu1-u2',
    pageNumber: 9,
    englishText: `Vocabulary: Family Members
dad (father)
mom (mother)
grandpa (grandfather)
grandma (grandmother)
uncle
aunt
baby`,
    chineseText: `词汇：家庭成员
爸爸
妈妈
爷爷/外公
奶奶/外婆
叔叔/舅舅
阿姨/姑姑
宝宝`,
    words: [
      { word: 'grandpa', translation: '爷爷/外公', pronunciation: '/ˈɡrænpɑː/' },
      { word: 'grandma', translation: '奶奶/外婆', pronunciation: '/ˈɡrænmɑː/' },
      { word: 'uncle', translation: '叔叔/舅舅', pronunciation: '/ˈʌŋkl/' },
      { word: 'aunt', translation: '阿姨/姑姑', pronunciation: '/ænt/' },
    ],
  },
  {
    id: 'pu1-u2-p3',
    lessonId: 'pu1-u2',
    pageNumber: 10,
    englishText: `Rhyme: My Family
Dad is tall, mom is kind,
Brother runs, sister finds,
Grandma bakes, grandpa smiles,
I love my family all the while!`,
    chineseText: `韵律诗：我的家庭
爸爸很高，妈妈很善良，
哥哥跑步，姐姐找东西，
奶奶烘焙，爷爷微笑，
我一直爱我的家庭！`,
    words: [
      { word: 'tall', translation: '高的', pronunciation: '/tɔːl/' },
      { word: 'kind', translation: '善良的', pronunciation: '/kaɪnd/' },
      { word: 'run', translation: '跑', pronunciation: '/rʌn/' },
      { word: 'find', translation: '找到', pronunciation: '/faɪnd/' },
      { word: 'bake', translation: '烘焙', pronunciation: '/beɪk/' },
      { word: 'smile', translation: '微笑', pronunciation: '/smaɪl/' },
    ],
  },

  // Power Up 1 - Unit 3: At School
  {
    id: 'pu1-u3-p1',
    lessonId: 'pu1-u3',
    pageNumber: 12,
    englishText: `Welcome to school!
This is my classroom.
I have a desk and a chair.
I have books and pencils.
My teacher is nice.`,
    chineseText: `欢迎来到学校！
这是我的教室。
我有一张书桌和一把椅子。
我有书和铅笔。
我的老师很友好。`,
    words: [
      { word: 'school', translation: '学校', pronunciation: '/skuːl/' },
      { word: 'classroom', translation: '教室', pronunciation: '/ˈklæsruːm/' },
      { word: 'desk', translation: '书桌', pronunciation: '/desk/' },
      { word: 'chair', translation: '椅子', pronunciation: '/tʃer/' },
      { word: 'books', translation: '书', pronunciation: '/bʊks/' },
      { word: 'pencils', translation: '铅笔', pronunciation: '/ˈpensəlz/' },
    ],
  },
  {
    id: 'pu1-u3-p2',
    lessonId: 'pu1-u3',
    pageNumber: 13,
    englishText: `School Supplies
pen, pencil, eraser, ruler
book, notebook, backpack
pencil case, glue, scissors
What's in your backpack?`,
    chineseText: `学习用品
钢笔、铅笔、橡皮、尺子
书、笔记本、背包
铅笔盒、胶水、剪刀
你的书包里有什么？`,
    words: [
      { word: 'pen', translation: '钢笔', pronunciation: '/pen/' },
      { word: 'eraser', translation: '橡皮', pronunciation: '/ɪˈreɪsər/' },
      { word: 'ruler', translation: '尺子', pronunciation: '/ˈruːlər/' },
      { word: 'backpack', translation: '背包', pronunciation: '/ˈbækpæk/' },
      { word: 'scissors', translation: '剪刀', pronunciation: '/ˈsɪzərz/' },
    ],
  },

  // Power Up 1 - Unit 4: My Toys (In Progress)
  {
    id: 'pu1-u4-p1',
    lessonId: 'pu1-u4',
    pageNumber: 16,
    englishText: `These are my toys.
I have a red car.
I have a blue ball.
I have a teddy bear.
I have building blocks.`,
    chineseText: `这些是我的玩具。
我有一辆红色的汽车。
我有一个蓝色的球。
我有一只泰迪熊。
我有积木。`,
    words: [
      { word: 'toys', translation: '玩具', pronunciation: '/tɔɪz/' },
      { word: 'car', translation: '汽车', pronunciation: '/kɑːr/' },
      { word: 'ball', translation: '球', pronunciation: '/bɔːl/' },
      { word: 'teddy bear', translation: '泰迪熊', pronunciation: '/ˈtedi ber/' },
      { word: 'blocks', translation: '积木', pronunciation: '/blɑːks/' },
    ],
  },
  {
    id: 'pu1-u4-p2',
    lessonId: 'pu1-u4',
    pageNumber: 17,
    englishText: `What do you like to play?
I like to play with my train.
I like to play with my dolls.
I like to play games.
Playing is fun!`,
    chineseText: `你喜欢玩什么？
我喜欢玩我的火车。
我喜欢玩我的娃娃。
我喜欢玩游戏。
玩耍很有趣！`,
    words: [
      { word: 'play', translation: '玩耍', pronunciation: '/pleɪ/' },
      { word: 'train', translation: '火车', pronunciation: '/treɪn/' },
      { word: 'dolls', translation: '娃娃', pronunciation: '/dɑːlz/' },
      { word: 'games', translation: '游戏', pronunciation: '/ɡeɪmz/' },
      { word: 'fun', translation: '有趣的', pronunciation: '/fʌn/' },
    ],
  },

  // Power Up 1 - Unit 5: Food
  {
    id: 'pu1-u5-p1',
    lessonId: 'pu1-u5',
    pageNumber: 20,
    englishText: `I like apples.
I like bananas.
I don't like oranges.
I love ice cream!

Do you like carrots?
Yes, I do. / No, I don't.`,
    chineseText: `我喜欢苹果。
我喜欢香蕉。
我不喜欢橙子。
我爱冰淇淋！

你喜欢胡萝卜吗？
是的，我喜欢。/ 不，我不喜欢。`,
    words: [
      { word: 'apples', translation: '苹果', pronunciation: '/ˈæplz/' },
      { word: 'bananas', translation: '香蕉', pronunciation: '/bəˈnænəz/' },
      { word: 'oranges', translation: '橙子', pronunciation: '/ˈɔːrɪndʒɪz/' },
      { word: 'ice cream', translation: '冰淇淋', pronunciation: '/aɪs kriːm/' },
      { word: 'carrots', translation: '胡萝卜', pronunciation: '/ˈkærəts/' },
    ],
  },
  {
    id: 'pu1-u5-p2',
    lessonId: 'pu1-u5',
    pageNumber: 21,
    englishText: `Food Groups
Fruits: apple, banana, orange
Vegetables: carrot, tomato, broccoli
Protein: chicken, fish, eggs
Dairy: milk, cheese, yogurt`,
    chineseText: `食物分类
水果：苹果、香蕉、橙子
蔬菜：胡萝卜、番茄、西兰花
蛋白质：鸡肉、鱼肉、鸡蛋
奶制品：牛奶、奶酪、酸奶`,
    words: [
      { word: 'fruits', translation: '水果', pronunciation: '/fruːts/' },
      { word: 'vegetables', translation: '蔬菜', pronunciation: '/ˈvedʒtəblz/' },
      { word: 'protein', translation: '蛋白质', pronunciation: '/ˈproʊtiːn/' },
      { word: 'dairy', translation: '奶制品', pronunciation: '/ˈderi/' },
      { word: 'tomato', translation: '番茄', pronunciation: '/təˈmeɪtoʊ/' },
    ],
  },

  // Power Up 1 - Unit 6: Animals (Locked)
  {
    id: 'pu1-u6-p1',
    lessonId: 'pu1-u6',
    pageNumber: 24,
    englishText: `Farm Animals
The cow says "moo".
The pig says "oink".
The chicken says "cluck".
The sheep says "baa".`,
    chineseText: `农场动物
奶牛说"哞"。
猪说"呼噜"。
鸡说"咯咯"。
羊说"咩"。`,
    words: [
      { word: 'cow', translation: '奶牛', pronunciation: '/kaʊ/' },
      { word: 'pig', translation: '猪', pronunciation: '/pɪɡ/' },
      { word: 'chicken', translation: '鸡', pronunciation: '/ˈtʃɪkɪn/' },
      { word: 'sheep', translation: '羊', pronunciation: '/ʃiːp/' },
      { word: 'moo', translation: '哞', pronunciation: '/muː/' },
    ],
  },
  {
    id: 'pu1-u6-p2',
    lessonId: 'pu1-u6',
    pageNumber: 25,
    englishText: `Wild Animals
The lion is the king.
The elephant is big.
The monkey is funny.
The giraffe is tall.

Can you see the tiger?`,
    chineseText: `野生动物
狮子是万兽之王。
大象很大。
猴子很有趣。
长颈鹿很高。

你能看到老虎吗？`,
    words: [
      { word: 'lion', translation: '狮子', pronunciation: '/ˈlaɪən/' },
      { word: 'elephant', translation: '大象', pronunciation: '/ˈelɪfənt/' },
      { word: 'monkey', translation: '猴子', pronunciation: '/ˈmʌŋki/' },
      { word: 'giraffe', translation: '长颈鹿', pronunciation: '/dʒəˈræf/' },
      { word: 'tiger', translation: '老虎', pronunciation: '/ˈtaɪɡər/' },
    ],
  },

  // 更多Power Up 1的单元内容...
  // 为了简洁，这里只展示部分内容，实际文件中包含所有单元
];

// 虚拟宠物数据
export const learningPet: LearningPet = {
  id: 'pet-001',
  name: 'Mochi',
  emoji: '🐱', // 用户选择了小猫
  mood: 'happy',
  level: 3,
  experience: 75, // 距离下一级还需25点经验
};

// 用户等级数据
export const userLevel: UserLevel = {
  currentLevel: 2, // L2级别
  currentExp: 450,
  maxExp: 1000,
  totalStars: 42, // 已获得42颗星
};

// 成就徽章数据
export const badges: Badge[] = [
  {
    id: 'badge-1',
    name: 'Beginner',
    description: '完成第一个单元',
    icon: '🌱',
    unlocked: true,
    unlockedAt: new Date('2024-01-15'),
    requirement: 'Complete your first lesson',
  },
  {
    id: 'badge-2',
    name: 'Collector',
    description: '获得10颗星星',
    icon: '⭐',
    unlocked: true,
    unlockedAt: new Date('2024-01-20'),
    requirement: 'Collect 10 stars',
  },
  {
    id: 'badge-3',
    name: 'Dedicated',
    description: '连续学习7天',
    icon: '🔥',
    unlocked: true,
    unlockedAt: new Date('2024-01-22'),
    requirement: 'Study for 7 days in a row',
  },
  {
    id: 'badge-4',
    name: 'Vocabulary Master',
    description: '收藏50个单词',
    icon: '📖',
    unlocked: false,
    requirement: 'Add 50 words to favorites',
  },
  {
    id: 'badge-5',
    name: 'Bookworm',
    description: '完成一本教材',
    icon: '📚',
    unlocked: false,
    requirement: 'Complete an entire textbook',
  },
  {
    id: 'badge-6',
    name: 'Star Pupil',
    description: '在一个单元获得3颗星',
    icon: '🌟',
    unlocked: true,
    unlockedAt: new Date('2024-01-18'),
    requirement: 'Earn 3 stars in one lesson',
  },
  {
    id: 'badge-7',
    name: 'Perfect Score',
    description: '在所有单元都获得3颗星',
    icon: '💯',
    unlocked: false,
    requirement: 'Earn 3 stars in every lesson',
  },
  {
    id: 'badge-8',
    name: 'Social Learner',
    description: '连续30天学习',
    icon: '🤝',
    unlocked: false,
    requirement: 'Study for 30 days straight',
  },
];

// 收藏数据
export const favorites: Favorite[] = [
  // 收藏的单词
  {
    id: 'fav-1',
    type: 'word',
    english: 'happy',
    chinese: '开心的',
    lessonId: 'pu1-u1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'fav-2',
    type: 'word',
    english: 'family',
    chinese: '家庭',
    lessonId: 'pu1-u2',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: 'fav-3',
    type: 'word',
    english: 'elephant',
    chinese: '大象',
    lessonId: 'pu1-u6',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: 'fav-4',
    type: 'word',
    english: 'delicious',
    chinese: '美味的',
    lessonId: 'pu1-u5',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'fav-5',
    type: 'word',
    english: 'adventure',
    chinese: '冒险',
    lessonId: 'pu2-u1',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: 'fav-6',
    type: 'word',
    english: 'beautiful',
    chinese: '美丽的',
    lessonId: 'pu1-u7',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 'fav-7',
    type: 'word',
    english: 'computer',
    chinese: '电脑',
    lessonId: 'pu2-u7',
    createdAt: new Date('2024-01-21'),
  },
  {
    id: 'fav-8',
    type: 'word',
    english: 'rainbow',
    chinese: '彩虹',
    lessonId: 'pu1-u7',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: 'fav-9',
    type: 'word',
    english: 'sunshine',
    chinese: '阳光',
    lessonId: 'pu1-u9',
    createdAt: new Date('2024-01-23'),
  },
  {
    id: 'fav-10',
    type: 'word',
    english: 'friendship',
    chinese: '友谊',
    lessonId: 'pu1-u1',
    createdAt: new Date('2024-01-24'),
  },
  // 收藏的句子
  {
    id: 'fav-11',
    type: 'sentence',
    english: 'I love my family all the while!',
    chinese: '我一直爱我的家庭！',
    lessonId: 'pu1-u2',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: 'fav-12',
    type: 'sentence',
    english: 'The lion is the king of the jungle.',
    chinese: '狮子是丛林之王。',
    lessonId: 'pu1-u6',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: 'fav-13',
    type: 'sentence',
    english: 'I am happy, I am great!',
    chinese: '我很开心，我很棒！',
    lessonId: 'pu1-u1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'fav-14',
    type: 'sentence',
    english: 'My teacher is nice and kind.',
    chinese: '我的老师很友好善良。',
    lessonId: 'pu1-u3',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: 'fav-15',
    type: 'sentence',
    english: 'Learning English is fun and exciting!',
    chinese: '学习英语很有趣很刺激！',
    lessonId: 'pu1-u1',
    createdAt: new Date('2024-01-20'),
  },
];

// 学习统计数据
export const studyStats: StudyStats = {
  dailyStudyTime: [
    { date: '2024-01-15', minutes: 25 },
    { date: '2024-01-16', minutes: 30 },
    { date: '2024-01-17', minutes: 20 },
    { date: '2024-01-18', minutes: 35 },
    { date: '2024-01-19', minutes: 28 },
    { date: '2024-01-20', minutes: 40 },
    { date: '2024-01-21', minutes: 22 },
    { date: '2024-01-22', minutes: 33 },
    { date: '2024-01-23', minutes: 27 },
    { date: '2024-01-24', minutes: 31 },
    { date: '2024-01-25', minutes: 29 },
    { date: '2024-01-26', minutes: 26 },
    { date: '2024-01-27', minutes: 32 },
    { date: '2024-01-28', minutes: 24 },
  ],
  totalStudyTime: 450, // 总共450分钟 = 7.5小时
  streakDays: 14, // 连续14天学习
  lastStudyDate: '2024-01-28',
};
