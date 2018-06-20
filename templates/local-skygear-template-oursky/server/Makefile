DOCKER_COMPOSE_TEST_CMD := docker-compose -f docker-compose.yml -f docker-compose.test.yml --project-name='helloworldtest'

.PHONY: docker-build
docker-build:
	docker-compose build skygear-plugin

.PHONY: setup-development
setup-development:
	rm -f docker-compose.override.yml
	ln -s docker-compose.development.yml docker-compose.override.yml
	docker-compose build skygear-plugin
	docker-compose up -d postgres
	sleep 10
	docker-compose run --rm skygear-plugin alembic upgrade head
	docker-compose down

.PHONY: migrate-create
migrate-create: docker-build
	docker-compose run --rm skygear-plugin alembic revision -m ${NAME}

.PHONY: migrate-up-one
migrate-up-one: docker-build
	docker-compose run --rm skygear-plugin alembic upgrade +1

.PHONY: migrate-down-one
migrate-down-one: docker-build
	docker-compose run --rm skygear-plugin alembic downgrade -1

.PHONY: flake8
flake8: docker-build
	${DOCKER_COMPOSE_TEST_CMD} run --rm skygear-plugin flake8

.PHONY: after-pytest
after-pytest:
	${DOCKER_COMPOSE_TEST_CMD} down -v

.PHONY: before-pytest
before-pytest: after-pytest
	${DOCKER_COMPOSE_TEST_CMD} build skygear-plugin
	${DOCKER_COMPOSE_TEST_CMD} up -d postgres
	sleep 10
	${DOCKER_COMPOSE_TEST_CMD} run --rm skygear-plugin alembic upgrade head

.PHONY: pytest
pytest:
	${DOCKER_COMPOSE_TEST_CMD} run --rm skygear-plugin pytest ${ARGS}
