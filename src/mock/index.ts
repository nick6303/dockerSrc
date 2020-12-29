const sectionMock = [
  {
    id: 1,
    title: '优惠满意度调查',
    description: '段落叙述编辑段落叙述编辑段落叙述编辑',
    questions: [
      {
        id: 1,
        type: 1, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '请问以下哪些因素使您决定参加活动？(最多选3项)',
        isRequired: true,
        needOther: false,
        options: [
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
        ]
      },
      {
        id: 1,
        type: 2, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '请问您较喜欢和种奖励？(最多选3项)',
        isRequired: true,
        needOther: false,
        options: [
          '活动要求低',
          '活动要求低',
          '活动要求低',
          '活动要求低',
        ]
      },
    ]
  },
  {
    id: 2,
    title: '个人习惯调查',
    description: '段落叙述编辑段落叙述编辑段落叙述编辑',
    questions: [
      {
        id: 1,
        type: 3, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '请告诉我们您的真心话给迪拜皇宫任何建议或意见。',
        isRequired: true,
        needOther: false,
        options: [ ]
      },
    ]
  },
  {
    id: 3,
    title: '金流满意度调查',
    description: '段落叙述编辑段落叙述编辑段落叙述编辑',
    questions: [
      {
        id: 1,
        type: 4, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '迪拜皇宫取款平均多久到账？',
        isRequired: false,
        needOther: false,
        options: [
          '1分鐘',
          '1分鐘',
          '1分鐘',
          '1分鐘',
          '1分鐘'
        ]
      },
    ]
  },
]

export {
  sectionMock
}
