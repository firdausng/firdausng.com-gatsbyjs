build:
	rm -rf public
	npm run build

deploy: build
	aws s3 sync public/ s3://firdausng.com --acl public-read --delete
	aws configure set preview.cloudfront true
	aws cloudfront create-invalidation --distribution-id EO46254OEATX3 --path '/*'
