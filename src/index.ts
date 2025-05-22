import {
  Kernel,
  KernelManager,
  IKernelManager,
  ServerConnection,
  ServiceManagerPlugin
} from '@jupyterlab/services';

const kernelPlugin: ServiceManagerPlugin<Kernel.IManager> = {
  id: 'distributed-jupyter-demo:plugin',
  description: 'A JupyterLab extension providing a kernel manager',
  autoStart: true,
  provides: IKernelManager,
  activate: (_: null): Kernel.IManager => {
    console.log('Activating KernelManager');

    const serverSettings = ServerConnection.makeSettings({
      baseUrl: 'http://localhost:8888', // Point to Server A
      token: 'abc123'
    });

    const manager = new KernelManager({ serverSettings });

    manager.ready.then(async () => {
      console.log('KernelManager.startNew called with', {
        name: 'python3'
      });

      await manager.startNew({ name: 'python3' });
    });

    return manager;
  }
};

export default kernelPlugin;
