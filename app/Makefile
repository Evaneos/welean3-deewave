build-docker:
	docker build -t weleanit-music ../docker/

launch-docker:
	docker run -ti -v $$(echo `pwd`):/weleanit-music -v $$(echo `pwd`)/../mongodb:/data/db -p 3000:3000 --net="host" weleanit-music /sbin/my_init --enable-insecure-key

install:
	npm install
	gulp springbokjs-shim

clean:
	rm -Rf public/dist/*
	rm -Rf public/images/*
	rm -Rf lib/*
	gulp springbokjs-shim

watch:
	gulp watch --env='dev'
