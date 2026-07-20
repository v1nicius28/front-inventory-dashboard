# 📦 Inventory Dashboard — Frontend

![Deploy Status](https://github.com/v1nicius28/front-inventory-dashboard/actions/workflows/deploy.yml/badge.svg)

Aplicação web desenvolvida em React + Vite, estilizada com TailwindCSS, responsável por consumir a API de inventário e exibir o painel interativo com login, listagem e controle de produtos.

---

![Logo do Dashboard](./public/dashboard.png)

---

## 🚀 Tecnologias Utilizadas

- React
- Vite
- TailwindCSS
- Axios (requisições HTTP)
- React Router DOM
- Zod (validação)
- JWT no localStorage
- Context API para autenticação

## ☁️ Infraestrutura e Deploy (AWS)

O frontend é hospedado como um site estático em infraestrutura AWS, servido globalmente via CDN:
 
| Componente | Tecnologia |
|---|---|
| Armazenamento estático | AWS S3 (bucket privado) |
| CDN / HTTPS | AWS CloudFront (Origin Access Control) |
| Automatização de Deploy | GitHub Actions (CI/CD) |
| Backend consumido | API própria em AWS EC2 (ver repositório do backend) |
 
**Frontend em produção:** `https://d1pvxrw67lwcz1.cloudfront.net`

## 🔄 Esteira de CI/CD (GitHub Actions)

O projeto conta com uma esteira automatizada de deploy. A cada `push` realizado na branch `main`:
1. O GitHub Actions inicializa um ambiente virtual.
2. Realiza o processo de build da aplicação (`npm run build`).
3. Sincroniza automaticamente os arquivos gerados com o bucket **AWS S3**.
4. Dispara uma invalidação de cache no **AWS CloudFront** para garantir que as alterações fiquem disponíveis instantaneamente para os usuários.
5. Todo o processo é autenticado de forma segura via IAM utilizando credenciais restritas (princípio do privilégio mínimo).

### Arquitetura

---

<p align="center">
  <img src="./public/diagrama.png" alt="Diagrama" height="400" />
</p>

---

O bucket S3 é **privado** — todo o acesso é intermediado pelo CloudFront via Origin Access Control (OAC), sem exposição pública direta do armazenamento.

## ⚙️ Funcionalidades
 
- 🔐 Login com JWT
- 👤 Acesso como convidado
- 📦 Listagem de produtos
- ➕ Cadastro de produto
- ✏️ Atualização de produto
- 🗑️ Exclusão de produto
- 📊 Dashboard interativo
- 🚫 Redirecionamento automático ao deslogar/token inválido

## 🔗 Projeto relacionado
 
Backend: *([ Link do repositório do backend ](https://github.com/v1nicius28/api-inventory-dashboard))*
