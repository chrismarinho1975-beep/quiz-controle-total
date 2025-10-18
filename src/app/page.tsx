'use client'

import { useState } from 'react'
import { ChevronRight, Clock, Shield, Target, MessageCircle, Mail } from 'lucide-react'

interface Question {
  id: number
  text: string
  options?: string[]
  points: number[]
}

const questions: Question[] = [
  {
    id: 1,
    text: "Você já sentiu vergonha depois de terminar rápido demais?",
    points: [3, 0] // Sim: 3 pontos, Não: 0 pontos
  },
  {
    id: 2,
    text: "Sua parceira já demonstrou insatisfação com o tempo da relação?",
    points: [3, 0]
  },
  {
    id: 3,
    text: "Você evita momentos íntimos por medo de falhar?",
    points: [3, 0]
  },
  {
    id: 4,
    text: "Em média, quanto tempo você dura antes de chegar ao clímax?",
    options: ["Menos de 1 minuto", "1 a 3 minutos", "3 a 5 minutos", "Mais de 5 minutos"],
    points: [4, 3, 2, 1]
  },
  {
    id: 5,
    text: "Você sente que perde o controle mesmo tentando se segurar?",
    points: [3, 0]
  },
  {
    id: 6,
    text: "Já tentou algum método ou técnica que não funcionou?",
    points: [2, 0]
  },
  {
    id: 7,
    text: "Você sente que a ansiedade piora seu desempenho?",
    points: [3, 0]
  },
  {
    id: 8,
    text: "Se pudesse resolver isso de forma discreta e definitiva, você tentaria?",
    points: [0, 1] // Sim: 0 pontos (positivo), Não: 1 ponto
  }
]

const getResult = (score: number) => {
  if (score >= 18) {
    return {
      title: "Perda Total de Controle",
      description: "Você sente que não tem domínio sobre o seu corpo. A frustração e a vergonha estão te consumindo, mas existe um passo a passo para reverter isso. Você não está sozinho nessa luta.",
      icon: <Target className="w-12 h-12 text-red-400" />
    }
  } else if (score >= 10) {
    return {
      title: "Controle Parcial",
      description: "Você percebe o problema e tenta controlar, mas ainda falta técnica e confiança. Está no caminho certo, só precisa das ferramentas certas para dar o próximo passo.",
      icon: <Clock className="w-12 h-12 text-yellow-400" />
    }
  } else {
    return {
      title: "Controle Quase Total",
      description: "Você está perto do domínio completo — só precisa entender o que está te sabotando nos momentos decisivos. Com pequenos ajustes, você pode ter o controle total.",
      icon: <Shield className="w-12 h-12 text-green-400" />
    }
  }
}

export default function ControleQuiz() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'quiz' | 'result' | 'offer'>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    const questionPoints = questions[currentQuestion].points[answerIndex]
    const newScore = score + questionPoints
    
    setAnswers(newAnswers)
    setScore(newScore)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setCurrentScreen('result')
      }, 300)
    }
  }

  const progress = currentScreen === 'quiz' ? ((currentQuestion + 1) / questions.length) * 100 : 0

  const result = getResult(score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Barra de Progresso */}
      {currentScreen === 'quiz' && (
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tela Inicial */}
        {currentScreen === 'intro' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                  Você realmente tem controle na hora H?
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Responda 8 perguntas rápidas e descubra o que está te impedindo de durar mais tempo.
                </p>
              </div>
              
              <div className="pt-8">
                <button
                  onClick={() => setCurrentScreen('quiz')}
                  className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-2xl text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  Começar agora
                  <ChevronRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-12 text-sm text-slate-400">
                <p>✓ Totalmente anônimo e discreto</p>
                <p>✓ Resultado personalizado em 2 minutos</p>
              </div>
            </div>
          </div>
        )}

        {/* Quiz */}
        {currentScreen === 'quiz' && (
          <div className="min-h-screen flex items-center justify-center pt-8">
            <div className="w-full max-w-2xl animate-slide-in">
              <div className="text-center mb-8">
                <span className="text-blue-400 font-semibold text-lg">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </span>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-relaxed">
                  {questions[currentQuestion].text}
                </h2>

                <div className="space-y-4">
                  {questions[currentQuestion].options ? (
                    // Pergunta com múltiplas opções
                    questions[currentQuestion].options!.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-4 md:p-6 text-left bg-slate-700/50 hover:bg-slate-600/50 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-slate-600/30 hover:border-blue-500/50"
                      >
                        <span className="text-lg font-medium">{option}</span>
                      </button>
                    ))
                  ) : (
                    // Pergunta Sim/Não
                    <>
                      <button
                        onClick={() => handleAnswer(0)}
                        className="w-full p-4 md:p-6 text-left bg-slate-700/50 hover:bg-slate-600/50 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-slate-600/30 hover:border-blue-500/50"
                      >
                        <span className="text-lg font-medium">Sim</span>
                      </button>
                      <button
                        onClick={() => handleAnswer(1)}
                        className="w-full p-4 md:p-6 text-left bg-slate-700/50 hover:bg-slate-600/50 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-slate-600/30 hover:border-blue-500/50"
                      >
                        <span className="text-lg font-medium">Não</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultado */}
        {currentScreen === 'result' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl text-center animate-fade-in">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700/50">
                <div className="flex justify-center mb-6">
                  {result.icon}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {result.title}
                </h2>
                
                <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
                  {result.description}
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setCurrentScreen('offer')}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    Ver Solução Completa
                  </button>

                  <button
                    onClick={() => setShowEmailForm(!showEmailForm)}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-white font-medium py-3 px-6 rounded-2xl text-base transition-all duration-300 border border-slate-600/30 hover:border-blue-500/50"
                  >
                    <Mail className="inline-block mr-2 w-5 h-5" />
                    Receber resultado completo por e-mail
                  </button>
                </div>

                {showEmailForm && (
                  <div className="mt-6 p-6 bg-slate-700/30 rounded-2xl animate-fade-in">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Seu melhor e-mail"
                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50"
                      />
                      <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-colors">
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Oferta Final */}
        {currentScreen === 'offer' && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl text-center animate-fade-in">
              <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-500/20">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                    Liberar o Método Completo
                  </h2>
                  
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                    Existe um material discreto e direto que ensina, passo a passo, como recuperar o controle e durar o tempo que quiser.
                  </p>
                  
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mt-4">
                    <strong className="text-white">Criado para homens reais</strong>, que estão cansados de se frustrar e querem resultados.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-6 md:p-8 mb-8 border border-blue-500/30">
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Técnicas Comprovadas</h4>
                        <p className="text-sm text-slate-400">Métodos que realmente funcionam</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">100% Discreto</h4>
                        <p className="text-sm text-slate-400">Ninguém precisa saber</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Resultados Rápidos</h4>
                        <p className="text-sm text-slate-400">Primeiras melhorias em dias</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-2xl md:text-3xl font-bold text-green-400">
                      Apenas R$ 9,90
                    </span>
                    <p className="text-slate-400 mt-2">Investimento único • Acesso imediato</p>
                  </div>

                  <button
                    onClick={() => window.open('#', '_blank')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                  >
                    🔓 Liberar Agora por R$ 9,90
                  </button>

                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Compra Segura
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Suporte 24h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <footer className="text-center text-sm text-slate-500 mt-12 pb-8">
          <p>Conteúdo educativo. Resultados podem variar.</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}