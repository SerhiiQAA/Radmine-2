# Playwright Tests with Allure Report

This project contains automated tests using Playwright and generates test reports using Allure Report. The tests are implemented with the Page Object Model (POM) pattern and the pipeline is set up with GitHub Actions to automate the workflow.

## Prerequisites

- Node.js
- npm

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```
2. **Install playwright:**
    ```bash
    npm run install:playwright
    ```
3. **Running Tests:**
    To run tests in headless mode (default):
    ```bash
    npm test
    ```
    To run tests in visible mode:
    ```bash
    npm run test:headed
    ```

## Allure Report
    To generate and view Allure reports:

1. **Install Allure CLI:**
    ```bash
    npm install allure-commandline -D
    ```

2. **Generate and View Reports Manually:**
   
    Generate the report:
    ```bash
    npm run report:generate
    ```
    Open the report:
    ```bash
    npm run report:open
    ```
3. **Running Tests with Report Generation:**
    Running Tests with Report:
    ```bash
    npm run test:report
    ```

## GitHub Actions

The project uses GitHub Actions for CI/CD. The pipeline is defined in the `playwright.yml` file. The steps include:

1. **Install dependencies**
2. **Run tests**
3. **Copy Allure results**
4. **Generate Allure report**
5. **Deploy report to GitHub Pages**
