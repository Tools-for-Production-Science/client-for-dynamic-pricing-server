# client-for-dynamic-pricing-server
This is a simple client in order to control the dynamic pricing engine server with a GUI (see also <a href="https://github.com/Tools-for-Production-Science/dynamic-pricing-in-production-networks.git" title="link">dynamic pricing in production networks</a>).

Please be aware that this client is currently fixed to work with the engine server on localhost with port 3001. For other servers, this setting needs to be changed in the client code.

# How to use it

There are two possibilities
### directly
First of all install all neccessary packages:
```
npm i
npm run build //compile current version
npm run serve //run a server, default port is 8080
npm run serve-dev //Option 2. This starts the Vue developement server which is reactive to code changes
```

### Docker
With docker all dependancy are automatically installed.
```
docker build . -t client
docker run -p 8080:8080 -d --name clientC client
```

Afterwards the client is available on port 8080. 

### controlling
For an easy start, the Demo.json from the other repository in the folder configs can be used (see also <a href="https://github.com/Tools-for-Production-Science/dynamic-pricing-in-production-networks/blob/main/configs/Demo.json" title="link">Demo.json</a>). Via the Button "Upload Configuration" it can be loaded. Afterwards the experiment can be started via the Button "Run Experiment". The experiment is shown in the table. There, with the button "Analytics" an interactive report can be called at the bottom of the page.