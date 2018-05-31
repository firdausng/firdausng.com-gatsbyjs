---
title: 'Simple Cucumber-JVM test with TestNG and Selenium'
date: "2018-05-30"
tags: ['Selenium', 'Cucumber-JVM', 'TestNg', 'Java']
categories: ['Automation Test', 'Cucumber']
---

Hi! This is example of using **TestNG** as test runner to run **Cucumber-JVM** and **Selenium**  
In this article, I am going to assume that you already have experience with **Java IDE** as well as **Maven**

<br>
<br>

# Setting Up Development Environment

<br>

## Required Tools

1.  Maven
2.  Integrated Development Environment (IDE) - i will be using [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download) in this article.
3.  Java JDK (7+)

<br>

## Setup Basic Maven + Cucumber-JVM Project

1.  Create new maven project
    > File --> New --> Project --> Maven
2.  After Project created, enable auto import Maven dependencies (You can enable it manually by below step)
    > File > Settings > search and select ‘Maven’ > choose ‘Importing’ >
    > enable ‘Import Maven projects automatically
3.  In your **pom.xml**, copy and paste below example pom.xml.  
    make sure you do not change your existing **groupId** and **artifactId**

<br>

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<project xmlns="http://maven.apache.org/POM/4.0.0"  
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">  
 <modelVersion>4.0.0</modelVersion>  
 <groupId>com.firdausng</groupId>  
 <artifactId>cucumberTestNgExample</artifactId>  
 <version>1.0-SNAPSHOT</version>  
 <properties> <java.version>1.8</java.version>  
	 <maven.compiler.version>3.7.0</maven.compiler.version>  
	 <cucumber.version>3.0.2</cucumber.version>  
	 <selenium.version>3.12.0</selenium.version>  
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
 <dependencies>
	 <dependency>
		 <groupId>io.cucumber</groupId>  
		 <artifactId>cucumber-java</artifactId>  
		 <version>${cucumber.version}</version>  
	 </dependency>  
	 <!-- https://mvnrepository.com/artifact/io.cucumber/cucumber-java8 -->  
	 <dependency>  
		 <groupId>io.cucumber</groupId>  
		 <artifactId>cucumber-java8</artifactId>  
		 <version>${cucumber.version}</version>  
	 </dependency>  
	<!-- https://mvnrepository.com/artifact/io.cucumber/cucumber-picocontainer -->  
	<dependency>  
		 <groupId>io.cucumber</groupId>  
		 <artifactId>cucumber-picocontainer</artifactId>  
		 <version>${cucumber.version}</version>  
	 </dependency>  
  <!-- https://mvnrepository.com/artifact/io.cucumber/cucumber-testng -->  
  <dependency>  
	 <groupId>io.cucumber</groupId>  
	 <artifactId>cucumber-testng</artifactId>  
	 <version>${cucumber.version}</version>  
	 <exclusions>
		 <exclusion>
			 <groupId>junit</groupId>  
			 <artifactId>junit</artifactId>  
		 </exclusion>
	</exclusions>
	</dependency>
	<!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->  
  <dependency>  
	 <groupId>org.seleniumhq.selenium</groupId>  
	 <artifactId>selenium-java</artifactId>  
	 <version>${selenium.version}</version>  
	 </dependency>  
  <dependency>  
	 <groupId>io.github.bonigarcia</groupId>  
	 <artifactId>webdrivermanager</artifactId>  
	 <version>1.7.2</version>  
 </dependency>
 </dependencies>  
</project>
```
<br>
4.  (Optional) If you have not download **Cucumber for Java** plugin, please do so.  
    This plugin is used to provide snippet and test runner for Cucumber-JVM 

> File > Settings > Plugins > search Cucumber for Java > Install  
> restart your IDE

<br>
<br>

## Add Basic Tests

Create _features_ folder on this path `src/test/resources/feature`. We will put all our _feature_ files inside this folder

> **src/test/resources** folder might not be created when you created the project
> in that case you need to manually created this folder

Create new **File** inside the **features** folder and named it as **google.feature**.  
Copy and paste below gherkin steps

```gherkin
Feature: Google Test  
  This is example of using Cucumber-JVM with TestNG and Selenium  

  Scenario: search google.com  
  to verify google search is working  
    Given I go to google  
    When I query for "cucumber spring selenium"  
    And click search  
    Then google page title should become "cucumber spring selenium - Google Search"  


  Scenario: check search suggestion  
  to verify suggestion appeared as the user type the query  
    Given I go to google  
    When I query for "cucumber spring selenium"  
    Then i should see "spring cucumber selenium" as 1 of the suggested search
```

<br>
<br>

## Add Step Definition

to complement the feature file, we need to create the corresponding _Step Definition_ class.  
Create package called **steps** under `src/test/java`. We will stored all the step definition classes in this package.  
Create a new class and named it as **GoogleStepDef**. Paste below code in this class  

```java
package steps;  

import cucumber.api.PendingException;  
import cucumber.api.java.en.And;  
import cucumber.api.java.en.Given;  
import cucumber.api.java.en.Then;  
import cucumber.api.java.en.When;  

public class GoogleStepDef {  
    @Given("^I go to google$")  
    public void iGoToGoogle() throws Throwable {  
        // Write code here that turns the phrase above into concrete actions  
        throw new PendingException();  
    }  

    @When("^I query for \"([^\"]*)\"$")  
    public void iQueryFor(String arg0) throws Throwable {  
        // Write code here that turns the phrase above into concrete actions  
        throw new PendingException();  
    }  

    @And("^click search$")  
    public void clickSearch() throws Throwable {  
        // Write code here that turns the phrase above into concrete actions  
        throw new PendingException();  
    }  

    @Then("^google page title should become \"([^\"]*)\"$")  
    public void googlePageTitleShouldBecome(String arg0) throws Throwable {  
        // Write code here that turns the phrase above into concrete actions  
        throw new PendingException();  
    }  

    @Then("^i should see \"([^\"]*)\" as (\\d+) of the suggested search$")  
    public void iShouldSeeAsOfTheSuggestedSearch(String arg0, int arg1) throws Throwable {  
        // Write code here that turns the phrase above into concrete actions  
        throw new PendingException();  
    }  
}
```
<br>

Do not worry about the **PendingException** since we going to change it later once we have created **Page Object Model**.  

<br>


## Add Page Object

Create another package called **pageobjects**. We will keep all the page object here.  
Create a class under this package and named it as **BasePage**

```java
package pageobjects;  

import org.openqa.selenium.WebDriver;  

import java.util.concurrent.TimeUnit;  
import java.util.logging.Logger;  

public abstract class BasePage {  

  private WebDriver driver;  

  protected String pageTitle;  

  private static Logger log = Logger.getLogger(BasePage.class.getName());  

  public BasePage(WebDriver driver){  
    this.driver = driver;  
    this.driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS); // 10 seconds Implicit Wait  
    this.driver.manage().window().maximize();  
  }  

  public String getPageTitle(){  
    return driver.getTitle();  
  }  

  public void navigate(String url){driver.get(url); }  

  public abstract boolean isAt();  
}
```
<br>

Create another class under this package and named it as **GooglePage** and extends the **BasePage**

```java
package pageobjects;  

import org.openqa.selenium.StaleElementReferenceException;  
import org.openqa.selenium.WebDriver;  
import org.openqa.selenium.WebElement;  
import org.openqa.selenium.support.FindBy;  
import org.openqa.selenium.support.FindBys;  
import org.openqa.selenium.support.PageFactory;  
import org.openqa.selenium.support.ui.ExpectedConditions;  
import org.openqa.selenium.support.ui.FluentWait;  
import org.openqa.selenium.support.ui.Wait;  
import org.openqa.selenium.support.ui.WebDriverWait;  

import java.time.Duration;  
import java.util.List;  
import java.util.NoSuchElementException;  

public class GooglePage extends BasePage {  

private String url;  

private WebDriver driver;  

@FindBy(id = "lst-ib")  
private WebElement searchTextBox;  
@FindBy(name = "btnK")  
private WebElement googleSearchBtn;  
@FindBy(id = "resultStats")  
private WebElement resultCount;  

@FindBys(@FindBy(css = "div .sbqs_c"))  
private List<WebElement> suggestions;  

private String searchQuery = "";  

public String getSearchQuery() {  
  return searchQuery;  
}  

private void setSearchQuery(String searchQuery) {  
  this.searchQuery = searchQuery;  
}  

public GooglePage(WebDriver driver) {  
  super(driver);  
  this.driver = driver;  
  PageFactory.initElements(driver, this);  
  this.url = "https://www.google.com";  
}  

@Override  
public boolean isAt() {  
  return false;  
}  

public void goTo() {  
  this.driver.get(this.url);  
}  

public void enterSearchQuery(String text) {  
  setSearchQuery(text);  
  WebDriverWait wait = new WebDriverWait(this.driver, 30);  
  wait.until(ExpectedConditions.elementToBeClickable(searchTextBox)).clear();  
  searchTextBox.sendKeys(getSearchQuery());  
}  

public void clickGoogleSearchBtn() {  
  searchTextBox.submit();  
}  

public boolean verifySuggestionExist(String suggestionText) {  

Wait wait = new FluentWait(this.driver)  
                .withTimeout(Duration.ofSeconds(30))  
                .pollingEvery(Duration.ofSeconds(1))  
                .ignoring(NoSuchElementException.class).ignoring(StaleElementReferenceException.class);  

wait.until(ExpectedConditions.elementToBeClickable(suggestions.get(0)));  

suggestions.stream()  
                .forEach(suggest -> System.out.println("suggestion is " + suggest.getText()));  
long suggestCount = suggestions.stream()  
                .filter(suggest -> suggest.getText().contains(suggestionText))  
                .count();  

if (suggestCount > 0) {  
  return true;  
} else {  
  return false;  
}  
}  
}
```

<br>
<br>

## Wire Page Object to The Step Definition

Open back **GoogleStepDef** class and copy paste below code

```java
package steps;  

import cucumber.api.java.en.And;  
import cucumber.api.java.en.Given;  
import cucumber.api.java.en.Then;  
import cucumber.api.java.en.When;  
import org.testng.Assert;  
import pageobjects.GooglePage;  

public class GoogleStepDef {  

private GooglePage google;  

 public GoogleStepDef(GooglePage google){  
        this.google = google;  
  }  

    @Given("^I go to google$")  
    public void iGoToGoogle() throws Throwable {  
        google.goTo();  
  }  

    @When("^I query for \"([^\"]*)\"$")  
    public void iQueryFor(String query) throws Throwable {  
        google.enterSearchQuery(query);  
  }  

    @And("^click search$")  
    public void clickSearch() throws Throwable {  
        google.clickGoogleSearchBtn();  
  }  

    @Then("^google page title should become \"([^\"]*)\"$")  
    public void googlePageTitleShouldBecome(String pageTitle) throws Throwable {  
        Assert.assertEquals(google.getSearchQuery() +" - Google Search", pageTitle);  
  }  

    @Then("^i should see \"([^\"]*)\" as 1 of the suggested search$")  
    public void iShouldSeeAsOfTheSuggestedSearch(String suggestion) throws Throwable {  
        Assert.assertTrue(google.verifySuggestionExist(suggestion));  
  }  
}
```
<br><br>

## Support Class to Run Selenium

Cucumber-JVM has a built-in support for dependency injection library such as *picocontainer, guice and spring*.  
We going to utilize dependency injection to inject **Page Object Class** and **Webdriver**.  
We going to use [picocontainer](https://github.com/cucumber/cucumber-jvm/tree/master/picocontainer) as our dependency injection library because it is the easiest to used.  
Create a package name **util** and create a class named **SharedDriver.java**. Copy paste code below to the class  

```java
package util;  

import cucumber.api.Scenario;  
import cucumber.api.java8.En;  
import io.github.bonigarcia.wdm.ChromeDriverManager;  
import io.github.bonigarcia.wdm.FirefoxDriverManager;  
import io.github.bonigarcia.wdm.InternetExplorerDriverManager;  
import org.openqa.selenium.OutputType;  
import org.openqa.selenium.WebDriver;  
import org.openqa.selenium.WebDriverException;  
import org.openqa.selenium.chrome.ChromeDriver;  
import org.openqa.selenium.firefox.FirefoxDriver;  
import org.openqa.selenium.ie.InternetExplorerDriver;  
import org.openqa.selenium.remote.DesiredCapabilities;  
import org.openqa.selenium.remote.RemoteWebDriver;  
import org.openqa.selenium.support.events.EventFiringWebDriver;  

import java.net.URL;  

/**  
 * <p>  
  * Example of a WebDriver implementation that has delegates all methods to a static instance (REAL_DRIVER) that is only  
 * created once for the duration of the JVM. The REAL_DRIVER is automatically closed when the JVM exits. This makes * scenarios a lot faster since opening and closing a browser for each scenario is pretty slow. * To prevent browser state from leaking between scenarios, cookies are automatically deleted before every scenario. * </p>  
  * <p>  
  * A new instance of SharedDriver is created for each Scenario and passed to yor Stepdef classes via Dependency Injection  
 * </p>  
  * <p>  
  * As a bonus, screenshots are embedded into the report for each scenario. (This only works  
 * if you're also using the HTML formatter). * </p>  
  * <p>  
  * A new instance of the SharedDriver is created for each Scenario and then passed to the Step Definition classes'  
 * constructor. They all receive a reference to the same instance. However, the REAL_DRIVER is the same instance throughout * the life of the JVM. * </p>  
  */  
public class SharedDriver extends EventFiringWebDriver implements En {  
private static final WebDriver REAL_DRIVER;  
private static final Thread CLOSE_THREAD = new Thread() {  
  @Override  
  public void run() {  
    REAL_DRIVER.close();  
  }  
};  

static {  
  Runtime.getRuntime().addShutdownHook(CLOSE_THREAD);  
  try {  
    REAL_DRIVER = getBrowser();  
  } catch (Throwable throwable) {  
    throwable.printStackTrace();  
    throw new Error(throwable);  
  }  
}  

public SharedDriver() {  
  super(REAL_DRIVER);  

  Before(manage()::deleteAllCookies);  

  After((Scenario scenario)->{  
    try {  
      byte[] screenshot = getScreenshotAs(OutputType.BYTES);  
      scenario.embed(screenshot, "image/png");  
    } catch (WebDriverException somePlatformsDontSupportScreenshots) {  
      System.err.println(somePlatformsDontSupportScreenshots.getMessage());  
    }  
    });  
  }  

  @Override  
  public void close() {  
    if (Thread.currentThread() != CLOSE_THREAD) {  
      throw new UnsupportedOperationException("You shouldn't close this WebDriver. It's shared and will close when the JVM exits.");  
    }  
    super.close();  
  }  

  private static WebDriver getBrowser() throws Throwable {  
    String desiredBrowserName = System.getProperty("browser", "chrome");  
    WebDriver desiredBrowser = null;  

  switch(desiredBrowserName) {  
    case "ie":  
      InternetExplorerDriverManager.getInstance().setup();  
      desiredBrowser = new InternetExplorerDriver();  
      break; 
    case "chrome":  
      ChromeDriverManager.getInstance().setup();  
      desiredBrowser = new ChromeDriver();  
      break; 
    case "firefox":  
      FirefoxDriverManager.getInstance().setup();  
      desiredBrowser = new FirefoxDriver();  
      break; 
      default:  
      //work out what to do when a browser isn't needed  
      break;  
  }  
  return desiredBrowser;  
  }  
}
```
<br>

create another class named **PicoDependencyInjector** and paste the code below

```
package util;  

import cucumber.runtime.java.picocontainer.PicoFactory;  

public class PicoDependencyInjector extends PicoFactory {  

    public PicoDependencyInjector() {  
        addClass(SharedDriver.class);  
  }  
}
```
<br><br>

## TestNG Test Runner

The final step is to add TestNG test runner to run the cucumber test.  
Basically we need a class that will contained test runner information and **testng.xml**  
First for test runner class, let create a class named **testNGCucumberRunner** and copy code below  

```java
import cucumber.api.CucumberOptions;  
import cucumber.api.testng.CucumberFeatureWrapper;  
import cucumber.api.testng.PickleEventWrapper;  
import cucumber.api.testng.TestNGCucumberRunner;  
import org.testng.annotations.AfterClass;  
import org.testng.annotations.BeforeClass;  
import org.testng.annotations.DataProvider;  
import org.testng.annotations.Test;  

@CucumberOptions(  
  plugin = {"pretty","json:target/report/cucumber2.json"},  
  strict = true,  
  features = {"src/test/resources/features"},  
  glue = {"steps", "util"}  
)  
public class UITest {  
    private TestNGCucumberRunner testNGCucumberRunner;  

  @BeforeClass(alwaysRun = true)  
    public void setUpClass() throws Exception {  
        testNGCucumberRunner = new TestNGCucumberRunner(this.getClass());  
  }  

    @Test(groups = "Cucumber", description = "Runs Cucumber Feature", dataProvider = "scenarios")  
    public void scenario(PickleEventWrapper pickleEvent, CucumberFeatureWrapper cucumberFeature) throws Throwable {  
        testNGCucumberRunner.runScenario(pickleEvent.getPickleEvent());  
  }  

    @DataProvider  
  public Object[][] scenarios() {  
        return testNGCucumberRunner.provideScenarios();  
  }  

    @AfterClass(alwaysRun = true)  
    public void tearDownClass() throws Exception {  
        testNGCucumberRunner.finish();  
  }  
}
```
<br>
in the root folder, create a file named <b>testng.xml</b> where we going to put testng configuration to this file

<br>

```xml
<?xml version="1.0" encoding="UTF-8"?>  
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">  
<suite name="Google Suite" verbose="1" thread-count="1" parallel="tests" configfailurepolicy="continue">  
	 <test name="Google UI automation">  
		 <classes>
			 <class name="UITest">  
				 <methods>
					 <include name="scenario"/>  
				 </methods>
			</class>
		</classes>
	</test>
</suite>
```
<br><br>
## Run Test

There are few ways to run the test.  
We going to run the test using **terminal** and **Maven**  

1.  go to the root folder of the project
2.  run this command `mvn clean test`
<br><br>

## Conclusion

1.  Cucumber-jvm support **JUnit** and **TestNG** as their test runner
2.  The only difference between _Junit_ and _TestNG_ are
    * Test runner class
    * testng.xml
