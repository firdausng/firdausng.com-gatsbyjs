---
path: '/second-post'
title: 'Project structure'
---

Example of maven project structure
```
project_root/
    pom.xml
    .gitignore
    .gitmodules
    api/
        pom.xml
        src/
        test/
            java/
                com.mbdt/
                    ApiConfig.java
                    api/
                        steps/
                            LocalCommonSteps.java
            resources/
                config/
                   api.properties
                   config.properties
                   controller.properties
                features/
                    api/
                        *.feature 
    ui/
        pom.xml
        src/
            java/
                com.mbdt.ui
                    steps/
                        GoogleSteps.java
                    pageobjects/
                        GooglePage.java        
        test/
            resources/
                config/
                   ui.properties
                   config.properties
                features/
                    ui/
                        google.feature  
    mbdt_test_framework/
```