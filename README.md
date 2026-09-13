# 🔄 SwapBox

> **Share what you have. Learn what you need. Exchange through community.**

**SwapBox** is a community-driven platform where people can **share physical resources and exchange skills** with others nearby.

Users can list things they own or skills they can provide, discover useful resources based on their location, and request them using a **credit-based exchange system** instead of direct payments.

## ✨ How It Works

1. 👤 **Create an account** and set your location.
2. 📦 **Add a Thing or Skill** you can provide.
3. 🔎 **Search nearby** resources using district, mandal, and category.
4. 🤝 **Send an exchange request** with credits or an offered resource.
5. ✅ The owner can **accept or reject** the request.
6. 🎯 Once the exchange is fulfilled, it can be marked **completed**.

### 💡 Example

Someone has a programming skill they can teach for 20 credits. Another user needs to learn programming, finds the skill nearby, and sends a request.

The same concept works for physical resources like **books, electronics, sports equipment, and tools**.

> **Everyone has something valuable — either something they own or something they know.**

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- 🎨 Tailwind CSS
- 🌐 Axios
- 🧭 React Router
- 🔐 JWT Authentication

### Backend
- ☕ Java
- 🌱 Spring Boot
- 🧩 Microservices
- 🔐 Spring Security + JWT
- 🗄️ Spring Data JPA / Hibernate
- 🛢️ MySQL

## 🏗️ Architecture

```text
                 ┌───────────────┐
                 │ React Client  │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │    Gateway    │
                 └───────┬───────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │   User   │   │ Resource │   │ Exchange │
     │ Service  │   │ Service  │   │ Service  │
     └──────────┘   └──────────┘   └──────────┘
                         │
                         ▼
                   ┌──────────┐
                   │  Credit  │
                   │ Service  │
                   └──────────┘
