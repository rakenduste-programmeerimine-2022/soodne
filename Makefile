init:
	docker build -t soodne .
run:
	docker run -p 3000:3000 soodne
stop:
	docker stop soodne
testinit:
	npx patch-package
test:
	npm test