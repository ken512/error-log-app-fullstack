include .env
export

.PHONY: setup up down restart logs app db migrate studio install

setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi
	docker compose up --build

up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose down
	docker compose up --build

logs:
	docker compose logs -f

app:
	docker compose exec app sh

db:
	docker compose exec postgres psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

install:
	docker compose exec app npm install

migrate:
	docker compose exec app npx prisma migrate dev

studio:
	docker compose exec app npx prisma studio