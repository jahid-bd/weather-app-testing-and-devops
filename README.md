# Weather Dashboard - DevOps Practice Project

A modern, responsive weather dashboard built with React, TypeScript, and Tailwind CSS. This project is specifically designed for DevOps learning and practice, featuring comprehensive testing, linting, and CI-ready scripts.

## 🌟 Features

- **Real-time Weather Display**: Track weather conditions across multiple cities
- **Interactive UI**: Add/remove cities, toggle temperature units (°C/°F)
- **5-Day Forecast**: Extended weather predictions
- **Responsive Design**: Mobile-first, works on all screen sizes
- **TypeScript**: Full type safety and better development experience
- **Comprehensive Testing**: Unit, integration, and component tests
- **Code Quality**: ESLint + Prettier for consistent code formatting

## 🚀 Perfect for DevOps Practice

This project includes all the necessary tools and scripts for DevOps workflows:

- ✅ **Testing Pipeline**: Jest/Vitest with comprehensive test coverage
- ✅ **Code Quality**: ESLint + Prettier for consistent formatting
- ✅ **Build Process**: Optimized Vite build for production
- ✅ **Type Checking**: TypeScript compilation validation
- ✅ **CI/CD Ready**: Scripts that can be easily integrated into workflows

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library, JSDOM
- **Code Quality**: ESLint, Prettier
- **Development**: Hot Module Replacement, TypeScript checking

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd devops-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧪 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI interface
npm run test:coverage # Run tests with coverage report
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check if code is formatted
```

## 🧪 Testing Strategy

The project includes comprehensive tests covering:

### Unit Tests
- **Utility Functions**: Weather calculations, formatting, and data transformations
- **Custom Hooks**: Weather data management and state handling
- **Type Safety**: Full TypeScript coverage

### Component Tests
- **Weather Cards**: Display and interaction testing
- **Form Components**: User input validation and submission
- **Loading States**: Spinner and error message components

### Integration Tests
- **User Workflows**: Complete user interactions (add/remove cities)
- **Component Communication**: Parent-child component interactions
- **State Management**: Hook and component state synchronization

### Example Test Coverage
```bash
# Run coverage report
npm run test:coverage

# Example output:
# ✓ 39/39 tests passed
# 📊 Coverage: Functions 95%+ | Statements 90%+ | Branches 85%+
```

## 🎨 Code Quality & Formatting

### ESLint Configuration
- TypeScript support with strict rules
- React hooks validation
- Import/export consistency
- Code complexity monitoring
- Accessibility best practices

### Prettier Configuration
- Consistent code formatting
- Single quotes for strings
- Semicolons enabled
- 2-space indentation
- Line length: 80 characters

### Pre-commit Hooks (Recommended)
Add these to your CI pipeline:
```bash
npm run lint         # Catch code quality issues
npm run format:check # Ensure consistent formatting
npm run test:run     # Validate all tests pass
npm run build        # Ensure production build works
```

## 🏗️ CI/CD Integration

This project is designed to work seamlessly with CI/CD pipelines:

### Example GitHub Actions Workflow
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run format:check
      - run: npm run test:run
      - run: npm run build
```

### Docker Ready
The project can be easily containerized:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WeatherCard.tsx
│   ├── ForecastCard.tsx
│   ├── AddCityForm.tsx
│   └── LoadingSpinner.tsx
├── hooks/              # Custom React hooks
│   └── useWeatherData.ts
├── types/              # TypeScript type definitions
│   └── weather.ts
├── utils/              # Utility functions
│   └── weather.ts
├── data/               # Mock data and constants
│   └── mockWeather.ts
├── test/               # Test files
│   ├── setup.ts
│   ├── *.test.tsx
│   └── *.integration.test.tsx
└── App.tsx             # Main application component
```

## 🎯 DevOps Learning Opportunities

This project provides hands-on experience with:

1. **Automated Testing**: Set up test pipelines that run on every commit
2. **Code Quality Gates**: Implement linting and formatting checks
3. **Build Automation**: Create reproducible builds for different environments
4. **Deployment Strategies**: Practice with staging and production deployments
5. **Monitoring Setup**: Add performance and error monitoring
6. **Security Scanning**: Implement dependency vulnerability checks

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add corresponding tests in `src/test/`
3. Update types in `src/types/`
4. Run tests to ensure everything works

### Extending Tests
```typescript
// Example: Add a new test
describe('NewFeature', () => {
  it('should work correctly', () => {
    // Test implementation
    expect(true).toBe(true);
  });
});
```

## 📊 Performance

- **Bundle Size**: Optimized with Vite tree-shaking
- **Load Time**: Fast initial load with code splitting
- **Runtime**: Efficient React rendering with proper state management
- **Accessibility**: ARIA labels and semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Run tests: `npm run test:run`
4. Check formatting: `npm run format:check`
5. Run linting: `npm run lint`
6. Create a pull request

## 📝 License

This project is created for educational and DevOps practice purposes.

## 🎉 Getting Started with DevOps

1. **Start with the basics**: Run `npm install` and `npm run dev`
2. **Explore the tests**: Run `npm run test:ui` to see the interactive test interface
3. **Check code quality**: Try `npm run lint` and `npm run format:check`
4. **Build for production**: Run `npm run build` and `npm run preview`
5. **Create your CI pipeline**: Use the scripts in your preferred CI/CD platform

Ready to practice DevOps? This project gives you everything you need to build, test, and deploy a modern web application! 🚀
