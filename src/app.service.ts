import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>VittaFit API - Projeto Acadêmico</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
              
              * {
                  box-sizing: border-box;
                  margin: 0;
                  padding: 0;
              }

              body {
                  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                  background-color: #053227;
                  background-image: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.03) 0%, rgba(5, 50, 39, 0.5) 50%, #053227 100%);
                  color: #ffffff;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 24px;
              }

              .container {
                  text-align: center;
                  background: rgba(255, 255, 255, 0.03);
                  backdrop-filter: blur(20px);
                  -webkit-backdrop-filter: blur(20px);
                  padding: 48px 32px;
                  border-radius: 24px;
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                  max-width: 520px;
                  width: 100%;
                  transition: transform 0.3s ease;
              }

              .badge {
                  background-color: rgba(242, 120, 37, 0.1);
                  color: #f27825;
                  border: 1px solid rgba(242, 120, 37, 0.2);
                  padding: 6px 16px;
                  border-radius: 12px;
                  font-size: 11px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  display: inline-block;
                  margin-bottom: 24px;
              }

              h1 {
                  font-size: 32px;
                  font-weight: 800;
                  letter-spacing: -0.03em;
                  text-transform: uppercase;
                  margin-bottom: 14px;
                  color: #ffffff;
              }

              h1 span {
                  color: #f27825;
              }

              p {
                  color: rgba(255, 255, 255, 0.6);
                  font-size: 14px;
                  line-height: 1.6;
                  font-weight: 300;
                  letter-spacing: 0.01em;
                  margin-bottom: 36px;
              }

              .btn {
                  background-color: #f27825;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 16px 32px;
                  border-radius: 14px;
                  font-size: 12px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  box-shadow: 0 10px 20px -10px rgba(242, 120, 37, 0.3);
              }

              .btn:hover {
                  background-color: #d9651c;
                  transform: translateY(-2px);
                  box-shadow: 0 15px 25px -10px rgba(242, 120, 37, 0.4);
              }

              .btn:active {
                  transform: translateY(0);
              }

              .footer {
                  margin-top: 40px;
                  font-size: 11px;
                  font-weight: 400;
                  letter-spacing: 0.05em;
                  color: rgba(255, 255, 255, 0.3);
                  border-top: 1px solid rgba(255, 255, 255, 0.05);
                  padding-top: 24px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <span class="badge">Ambiente de Desenvolvimento</span>
              <h1>Vitta<span>Fit</span> Backend</h1>
              <p>Este é o ecossistema de APIs da plataforma VittaFit. Um ambiente acadêmico construído para a consolidação e gerenciamento de rotinas de saúde e treinos de alta performance.</p>
              
              <a href="/api" class="btn">
                  Acessar Swagger UI
                  <svg width="14" h="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              
              <div class="footer">
                  © 2026 VITTAFIT — CORE ENGINE API
              </div>
          </div>
      </body>
      </html>
    `;
  }
}