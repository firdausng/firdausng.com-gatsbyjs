---
path: '/first-post'
title: 'Project Setup'
---

1. Open IntelliJ IDEA IDE - [Download IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/)
2. create new maven project in IntelliJ IDEA by 
    1. click the file menu at the top right
    2. click new
    3. click project
    4. choose **maven** from the sidebar
    5. click **next**
    6. enter below information
        - GroupId = com.mbdt
        - artifactId = {your project name i.e IPI}
    7. click **next**
    8. Leave **project name** and **project location** as it is
    9. click **Finish**
3. create git submodule using below command in terminal

    ```sh
    git init
    git submodule add https://git.mbww.com/qa/bdd/mbdt_test_framework
    ```

4. in your project's root pom.xml, add the module  
    ```xml
    <modules>
            <module>mbdt_test_framework</module>
    </modules>
 
    <properties>
            <java.version>1.8</java.version>
            <maven.compiler.version>3.7.0</maven.compiler.version>
            <cucumber.version>2.1.0</cucumber.version>
            <restAssured.version>3.0.5</restAssured.version>
            <testrail.username>firdaus.kamaruddin@mbww.com</testrail.username>
            <testrail.apiKey>ehElC3BSJ6sxE/Mtponn-q/nfulbsA1l1M8W8BhHS</testrail.apiKey>
            <testrail.projectId>47</testrail.projectId>
        </properties>
    
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>${maven.compiler.version}</version>
                    <configuration>
                        <source>${java.version}</source>
                        <target>${java.version}</target>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    ```
5. create new module for each of your test type
    1. right click your project name of left bar
    2. click **new**
    3. click **module** 
    4. click the file menu at the top right
    5. click new
    6. click project
    7. choose **maven** from the sidebar
    8. click **next**
    9. enter below information
        - GroupId = com.mbdt
        - artifactId = {your test type i.e ui}
    10. click **next**
    11. Leave **project name** and **project location** as it is
    12. click **Finish**    
6. in the pom.xml in your test automation sub module, add below dependencies
    ```xml
    <properties>
            <cucumber.jvm.parallel.version>4.2.0</cucumber.jvm.parallel.version>
        </properties>
    
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>2.20.1</version>
                    <configuration>
                        <testFailureIgnore>true</testFailureIgnore>
                        <systemPropertyVariables>
                            <env>${env}</env>
                            <testrail>${testrail}</testrail>
                            <testrail.username>${testrail.username}</testrail.username>
                            <testrail.apiKey>${testrail.apiKey}</testrail.apiKey>
                            <testrail.projectId>${testrail.projectId}</testrail.projectId>
                            <testrail.testType>UI</testrail.testType>
                            <browser>${browser}</browser>
                            <seleniumMethod>${seleniumMethod}</seleniumMethod>
                        </systemPropertyVariables>
                        <!-- Configure concurrent test execution. -->
                        <forkCount>${surefire.forkNumber}</forkCount>
                        <reuseForks>true</reuseForks>
                        <includes>
                            <!-- Look only for cucumber-jvm-parallel-plugin generated test runner classes. -->
                            <include>**/*IT.class</include>
                        </includes>
                        <useFile>false</useFile>
                        <redirectTestOutputToFile>${surefire.redirectOutputToFile}</redirectTestOutputToFile>
                    </configuration>
                </plugin>
                <plugin>
                    <groupId>com.github.temyers</groupId>
                    <artifactId>cucumber-jvm-parallel-plugin</artifactId>
                    <version>${cucumber.jvm.parallel.version}</version>
                    <executions>
                        <execution>
                            <id>generateRunners</id>
                            <phase>generate-test-sources</phase>
                            <goals>
                                <goal>generateRunners</goal>
                            </goals>
                            <configuration>
                                <!-- List of package names to scan for glue code. -->
                                <glue>
                                    <package>com.mbdt.ui.steps</package>
                                    <package>com.mbdt.ui.support</package>
                                    <!--<package>ui.util</package>-->
                                </glue>
                                <!-- When -Dcucumber.tags is passed it will override the tags configuration here. -->
                                <tags>
                                    <tag>~@wip</tag>
                                    <!-- Should be defaulted otherwise will fail with
                                    'The parameters 'tags' are missing or invalid: [~@wip, null]'-->
                                    <!--<tag>${cucumber.parallel.tags}</tag>-->
                                </tags>
                                <plugins>
                                    <plugin>
                                        <name>pretty</name>
                                    </plugin>
                                    <plugin>
                                        <name>json</name>
                                    </plugin>
                                    <plugin>
                                        <name>com.mbdt.utilities.testrail.TestRailReporter</name>
                                        <!--<noOutput>true</noOutput>-->
                                    </plugin>
                                </plugins>
                                <cucumberOutputDir>target/cucumber-json-reports</cucumberOutputDir>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
                <plugin>
                    <groupId>net.masterthought</groupId>
                    <artifactId>maven-cucumber-reporting</artifactId>
                    <version>3.11.0</version>
                    <executions>
                        <execution>
                            <id>execution</id>
                            <phase>test</phase>
                            <goals>
                                <goal>generate</goal>
                            </goals>
                            <configuration>
                                <projectName>API Report</projectName>
                                <outputDirectory>${project.build.directory}/cucumber-html-reports</outputDirectory>
                                <cucumberOutput>${project.build.directory}/cucumber-json-reports</cucumberOutput>
                                <parallelTesting>false</parallelTesting>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    
    
    
    
        <dependencies>
            <dependency>
                <groupId>com.mbdt</groupId>
                <artifactId>mbdt_test_framework</artifactId>
                <version>1.0-SNAPSHOT</version>
            </dependency>
    
        </dependencies>
    
    
        <profiles>
            <!-- Default profile to run and debug tests locally. -->
            <profile>
                <id>dev</id>
                <properties>
                    <env>qa</env>
                    <seleniumMethod>local</seleniumMethod>
                    <browser>chrome</browser>
                    <testrail>off</testrail>
                    <surefire.forkNumber>1</surefire.forkNumber>
                    <!-- ~@wip is repeated not to pass null, may be overridden by -Dcucumber.parallel.tags system variable. -->
                    <cucumber.parallel.tags>not @wip</cucumber.parallel.tags>
                    <surefire.redirectOutputToFile>false</surefire.redirectOutputToFile>
                </properties>
                <activation>
                    <activeByDefault>true</activeByDefault>
                </activation>
            </profile>
    
            <!-- Profile for Jenkins test runs. -->
            <profile>
                <id>jenkins</id>
                <properties>
                    <env>qa</env>
                    <seleniumMethod>hub</seleniumMethod>
                    <browser>chrome</browser>
                    <testrail>on</testrail>
                    <cucumber.parallel.tags>not @wip</cucumber.parallel.tags>
                    <surefire.redirectOutputToFile>true</surefire.redirectOutputToFile>
                </properties>
            </profile>
        </profiles>
    ```