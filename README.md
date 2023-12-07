<div align="center"><h1><b>Rarime Dashboard</b></h1></div>

Manage your identity credentials and Soulbound Tokens (SBTs) easily from the Rarime Dashboard.

## Getting Started

### Pre-requisites

#### Environment:

- Node.JS 18 [**[Download Here]**]
- Typescript 5.2 [**[Instructions to Download]**]

## Setup

### Starting the server:

- Clone the repository to your machine
- Open the folder in a code editor of your choice
- Install dependencies:
  ```bash
  yarn install
  ```
- Build the project:
  ```bash
  yarn build
  ```
- Start the server (The server starts in port `5173` by default):
  ```bash
  yarn start
  ```
- If the server fails due to the port being occupied, start the server in a different port:
  ```bash
  PORT=5000 yarn start
  ```

## Contributing

We welcome contributions from the community! To contribute to this project, follow these steps:

1. Fork the repository.
1. Create a new branch with a descriptive name for your feature or bug fix.
1. Make your changes and commit them.
1. Push your changes to your branch on your GitHub fork.
1. Create a pull request from your branch to the `main` branch of this repository.

Please ensure your pull request adheres to the following guidelines:
- Add a clear pull request title;
- Add a comprehensive pull request description that includes the motivation behind the changes, steps needed to test them, etc;
- Update the [CHANGELOG.md] accordingly;
- Keep the codebase clean and well-documented;
- Make sure your code is properly tested;
- Reference any related issues in your pull request;

The maintainers will review your pull request and may request changes or provide feedback before merging. We appreciate your contributions!


## Changelog

For the changelog, see [CHANGELOG.md](./CHANGELOG.md).

## License

This project is under the MIT License — see the [LICENSE](./LICENSE) file for details.

[Rarimo Proof of Humanity]: https://docs.rarimo.com/use-cases/proof-of-humanity
[Download Here]: https://nodejs.org/en/download/
[Instructions to Download]: https://www.typescriptlang.org/download
[CHANGELOG.md]: ./CHANGELOG.md
