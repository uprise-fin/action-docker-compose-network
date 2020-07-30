# Docker compose netwrok action

This action changes the network of the docker-compose.yml file.

## Inputs

### compose-file

**Required** The path of docker-compose.yml. Default `./docker-compose.yaml`

### network-name

**Required** The name of the network in docker-compose.yml to be changed

## target-network

**Required** The network name to change


## Outputs

### network-name

The network changed

## Example usage

```yaml
      - name: Change docker-compose network
        uses: uprise-fin/action-docker-compose-network@v0.1.0
        with:
          network-name: default
          compose-file: tests/docker-compose.yml
          target-network: ${{ job.container.network }}
```



