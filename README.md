# Distributed Jupyter Kernel Demo

[![Github Actions Status](https://github.com/QuantStack/distributed-jupyter-demo/workflows/Build/badge.svg)](https://github.com/QuantStack/distributed-jupyter-demo/actions/workflows/build.yml)

This project demonstrates a **proof of concept** for using a custom JupyterLab plugin to connect to a **remote Jupyter server's kernel manager** using a shared token. It shows how one JupyterLab frontend (Server B) can start and interact with kernels running on another backend Jupyter server (Server A).

---

## 🧩 What This Demo Does

- **Server A** is a Jupyter Server that exposes a kernel manager (with CORS enabled).
- **Server B** is a JupyterLab instance running a custom **ServiceManagerPlugin**.
- The plugin in Server B creates its own `KernelManager` that connects to Server A using a shared token and URL.
- Kernels started from Server B appear and run on Server A.

This can be a helpful starting point for building distributed or decoupled architectures in the Jupyter ecosystem (e.g., connecting to remote compute backends, multi-user systems, etc.).

---

## 🔧 Local Setup (Without Docker)

### 1. Create a Conda/mamba Environment and Install Dependencies

```bash
conda create -n distributed-jupyter-demo python=3.11 -y
conda activate distributed-jupyter-demo

pip install -e . && pip install jupyterlab
jlpm install
jupyter labextension develop . --overwrite
jupyter lab build

```

---

### 2. Start the Servers (In Separate Terminals)

**Terminal 1: Server A**

```bash
jupyter server --port 8888 --ServerApp.token=abc123 --ServerApp.allow_origin='http://localhost:8889'
```

**Terminal 2: Server B**

```bash
jupyter lab --port 8889 --ServerApp.token=abc123
```

Then open your browser at **http://localhost:8889/lab**. The kernel plugin will automatically start a kernel on Server A.

You can confirm the kernel was created by checking **http://localhost:8888/api/kernels**.

## 🐳 Run with Docker

This project comes with a ready-to-use Docker and Docker Compose setup.
You will need to have **Docker** installed in your system.

### 1. Build and Start the Servers

```bash
docker compose up --build
```

This launches:

- **http://localhost:8888** → Server A (backend kernel server)
- **http://localhost:8889** → Server B (JupyterLab frontend with plugin)

After going to **http://localhost:8889/lab**, Server B will start a kernel on Server A when loaded and you can see it in **http://localhost:8888/api/kernels**.

## 💡 Notes

This demo uses a shared token (abc123) to authenticate both servers. In production, proper security measures must be taken.

CORS is enabled on Server A to allow requests from Server B.

This setup assumes both servers are running on the same host, but the architecture can be adapted for different machines or containers.
