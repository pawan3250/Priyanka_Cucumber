Feature: Home Page Functionality

@login
Scenario: Verify the home page loads successfully
Given I am on the SDET Unicorns home Page
And I should see the special sale heading "Special Sale: Elevate Your SDET Skills! 🔥"
Then I should see the home page heading "Think different. Make different."

@data
Scenario Outline: Verify homepage navigation links are visible
Given I am on the SDET Unicorns home Page
Then I should see the home navigation link "<linkname>"

Examples:
| linkname |
| Home |
| About |
| Shop |
| Blog |
| Contact |
| My account |

@datatable
Scenario: Verify pricing plans are displayed
Given I am on the SDET Unicorns home Page
Then I should see the following pricing plans:
| planName |
| Silver |
| Gold |
| Platinum |

@home
Scenario: Click on learn more
Given I am on the SDET Unicorns home Page
When I click on the "Learn more" button
Then I should see the redirected page text "Academy Access"
When I return to the parent website
Then I should see the home page heading "Think different. Make different."





