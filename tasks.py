from invoke import task

APP_NAME = "project-name"
COMPOSE = f"docker-compose -p {APP_NAME} -f docker/docker-compose.local.yml"


@task
def build(c, webpack=False):
    """Build Docker environment locally"""
    if webpack:
        c.run(
            f"DOCKER_BUILDKIT=1 docker build -f docker/Dockerfile.webpack -t {APP_NAME}-webpack:local ."
        )
    else:
        c.run(
            f"DOCKER_BUILDKIT=1 docker build -f docker/Dockerfile -t {APP_NAME}:local ."
        )

@task
def dev(c):
    """Run Django dev server within a Docker container"""
    c.run(f"{COMPOSE} up web", pty=True)

@task
def down(c):
    """Stop docker-compose"""
    c.run(f"{COMPOSE} down", pty=True)

