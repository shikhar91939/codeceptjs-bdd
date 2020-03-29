@search_again
Feature: Search Github

  In order to see Github Search works
  As a Github user
  I want to be able to search for repository


# Use `Background` as Pre-requisite step if more than one scenario repeats the same
  Background: Navigate to HomePage
    Given Fred is on Github Homepage


  @search_again_results
  Scenario: _again_Fred should see the highlighted results for the searched repository

    When he searches for the "gkushang/codeceptjs-bdd"
    Then he sees all the detailed highlighted results including description or license info and many more

  @search_again_results_take_2
  Scenario: _again_take_2_Fred should see the highlighted results for the searched repository

    When he searches for the "gkushang/codeceptjs-bdd"
    Then he sees all the detailed highlighted results including description or license info and many more

  @search_again_results_take_3
  Scenario: _again_take_3_Fred should see the highlighted results for the searched repository

    When he searches for the "gkushang/codeceptjs-bdd"
    Then he sees all the detailed highlighted results including description or license info and many more
