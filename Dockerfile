FROM jupyter/base-notebook:python-3.11

WORKDIR /home/jovyan

COPY . /home/jovyan/distributed-jupyter-demo

# Fix permissions 
USER root
RUN chown -R jovyan:users /home/jovyan/distributed-jupyter-demo
USER jovyan

WORKDIR /home/jovyan/distributed-jupyter-demo

# Pre-create _version.py to avoid permission errors 
RUN touch distributed_jupyter_demo/_version.py

# Install Python dependencies and JupyterLab
RUN pip install --no-cache-dir -e . \
    && pip install jupyterlab

# Install and build frontend
RUN jlpm install --immutable \
    && jupyter labextension develop distributed_jupyter_demo --overwrite \
    && jupyter lab build

EXPOSE 8888

# Start JupyterLab
CMD ["jupyter", "lab", "--no-browser", "--ip=0.0.0.0"]
