'use client'

const plans = [
  {
    name: '免费版',
    price: '¥0',
    period: '/月',
    features: [
      '3个简历模板',
      '基础AI写作助手',
      'PDF导出',
      '基础支持'
    ],
    popular: false,
    cta: '开始免费使用'
  },
  {
    name: '专业版',
    price: '¥29',
    period: '/月',
    features: [
      '所有简历模板',
      '高级AI写作助手',
      '多种格式导出',
      '在线简历托管',
      '优先客服支持',
      '无广告体验'
    ],
    popular: true,
    cta: '选择专业版'
  },
  {
    name: '企业版',
    price: '¥99',
    period: '/月',
    features: [
      '所有专业版功能',
      '自定义AI模型',
      '团队协作',
      '高级数据分析',
      'API接口',
      '专属客服'
    ],
    popular: false,
    cta: '联系销售'
  }
]

export function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            选择适合您的方案
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从免费版开始，根据需求升级到更高级的方案
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`card relative ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 shadow-xl' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    最受欢迎
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg 
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 