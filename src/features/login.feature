@login
Feature: Login Functionality

    @smoke @positive @regression
    Scenario: Successful login with valid credentials
        Given I am on the login page
        When I enter username "standard_user"
        And I enter password "secret_sauce"
        And I click the login button
        Then I should see inventory page

    @smoke @negative
    Scenario: Failed login with invalid credentials
        Given I am on the login page
        When I enter username "invalid_user"
        And I enter password "wrong_password"
        And I click the login button
        Then I should see error message "Epic sadface: Username and password do not match any user in this service"

    @regression @data-driven
    Scenario Outline: Login with different user credentials
        Given I am on the login page
        When I enter username "<username>"
        And I enter password "<password>"
        And I click the login button
        Then I should see "<result>"

    Examples:
        | username        | password      | result          |
        | standard_user   | secret_sauce  | inventory page  |
        | locked_out_user | secret_sauce  | Epic sadface: Sorry, this user has been locked out.  |
        | invalid_user    | wrong_password | Epic sadface: Username and password do not match any user in this service  |
