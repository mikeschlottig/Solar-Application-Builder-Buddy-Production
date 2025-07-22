# Application Builder Buddy - E2B Development Environment with AI Integration
FROM node:21-slim

RUN apt-get update && apt-get install -y     curl     git     python3     python3-pip     python3-venv     libpq5     build-essential     && apt-get clean && rm -rf /var/lib/apt/lists/*

# The installer requires curl (and certificates) to download the release archive
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates

# Download the latest installer
ADD https://astral.sh/uv/install.sh /uv-installer.sh

# Run the installer then remove it
RUN sh /uv-installer.sh && rm /uv-installer.sh

# Install pnpm
RUN npm install -g pnpm

# Move uv to non-root path
RUN cp /root/.local/bin/uv /usr/local/bin/uv

# Ensure the installed binary is on the `PATH`
ENV PATH="/root/.local/bin/:$PATH"

# Install dependencies and customize sandbox
WORKDIR /home/user

# Set up Git configurations
RUN git config --global user.email "builder@leverageai.com" &&     git config --global user.name "leverageai-builder-buddy"

# Add build argument for cache busting
ARG BUST=1

# Create app directory and copy template files
RUN mkdir -p /home/user/app
COPY app/ /home/user/app/
WORKDIR /home/user/app
RUN mkdir -p /home/user/app/logs
RUN pnpm install

# Create a directory for the FastAPI server
RUN mkdir -p /home/user/services
COPY services/ /home/user/services/

# Create a directory for the FastAPI logging server
RUN mkdir -p /home/user/logging-server
COPY logging-server/ /home/user/logging-server/

# Install tree-sitter for code analysis
RUN apt-get update && apt-get install -y tree-sitter-cli

# Sync the project into a new environment, using the frozen lockfile
WORKDIR /home/user/services
RUN uv add pyre-check
RUN uv run playwright install
RUN uv run playwright install-deps
RUN uv sync --frozen

# Expose ports for builder interface and API
EXPOSE 5173 8000

# Start script for AI-powered development environment
RUN echo '#!/bin/bash\nset -e\n\n# Start FastAPI backend with AI features\ncd /home/user/services\nuv run uvicorn main:app --host 0.0.0.0 --port 8000 &\n\n# Start frontend development server\ncd /home/user/app\npnpm dev --host 0.0.0.0\n' > /home/user/start.sh && chmod +x /home/user/start.sh

CMD ["/home/user/start.sh"]