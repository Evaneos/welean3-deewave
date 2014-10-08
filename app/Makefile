build-docker:
	docker build -t weleanit-music ../docker/

launch-docker:
	docker run -ti -v $$(echo `pwd`):/weleanit-music -p 3000:3000 weleanit-music

install:
	npm install
	gulp springbokjs-shim

clean:
	rm -Rf public/dist/*
	rm -Rf public/images/*
	rm -Rf lib/*
	gulp springbokjs-shim

watch:
	gulp watch --env='dev' >watch.log 2>&1
