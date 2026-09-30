"use client"

export function AnimatedCoffeeLeaf() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-leaf-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hoja principal */}
        <g className="animate-leaf-sway">
          {/* Sombra */}
          <filter id="leafShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="1"
              dy="2"
              stdDeviation="2"
              floodOpacity="0.3"
              floodColor="#000000"
            />
          </filter>

          {/* Forma base de la hoja */}
          <path
            d="M 50 15 Q 70 30 75 50 Q 70 70 50 80 Q 30 70 25 50 Q 30 30 50 15"
            fill="url(#leafGradient)"
            stroke="#6b3e20"
            strokeWidth="0.8"
            filter="url(#leafShadow)"
          />

          {/* Vena central */}
          <path
            d="M 50 15 Q 50 40 50 80"
            stroke="#92400e"
            strokeWidth="1"
            opacity="0.6"
            strokeLinecap="round"
          />

          {/* Venas secundarias izquierda */}
          <path
            d="M 50 25 Q 40 30 32 35"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 35 Q 38 40 28 48"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 50 Q 35 55 25 62"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 65 Q 38 68 30 72"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* Venas secundarias derecha */}
          <path
            d="M 50 25 Q 60 30 68 35"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 35 Q 62 40 72 48"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 50 Q 65 55 75 62"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 50 65 Q 62 68 70 72"
            stroke="#92400e"
            strokeWidth="0.7"
            opacity="0.4"
            strokeLinecap="round"
          />

          {/* Textura de la hoja */}
          <ellipse
            cx="50"
            cy="50"
            rx="20"
            ry="28"
            fill="url(#leafTexture)"
            opacity="0.3"
          />
        </g>

        {/* Gradientes */}
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <radialGradient id="leafTexture" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.1" />
          </radialGradient>

          {/* Brillo animado */}
          <linearGradient id="leafShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Brillo que se mueve */}
        <ellipse
          cx="40"
          cy="35"
          rx="8"
          ry="12"
          fill="url(#leafShine)"
          className="animate-shine"
        />
      </svg>

      <style>{`
        @keyframes leaf-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        @keyframes leaf-sway {
          0%, 100% {
            transform: rotateZ(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateZ(2deg) rotateX(-2deg);
          }
          50% {
            transform: rotateZ(0deg) rotateX(2deg);
          }
          75% {
            transform: rotateZ(-2deg) rotateX(-2deg);
          }
        }

        @keyframes shine {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-leaf-float {
          animation: leaf-float 3s ease-in-out infinite;
          transform-origin: center;
        }

        .animate-leaf-sway {
          animation: leaf-sway 4s ease-in-out infinite;
          transform-origin: center center;
        }

        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
