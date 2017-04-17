---
layout:     post
comments:   true
title:      "Reversing the YNAB file format - Part 1: JSON Structure"
date:       2016-09-13 18:30
summary:    Part one of a series on creating an app to integrate with the soon-to-be-deprecated, yet well loved YNAB 4 budgeting software. Here we look at the budget JSON file structure.
categories: projects
---

Anyone reading this who is a user of the niche-but-somewhat-popular YNAB budgeting software will be well aware that [YNAB has moved to a subscription pricing structure](https://www.youneedabudget.com/blog/post/the-new-ynab-is-here), meaning that YNAB 4 will be the final version of the 'offline' budgeting software. A side effect of this move to the cloud is that the file structure is now set in stone. There will be no YNAB 5 to turn the budget file structure on its head. And there is no better time to look at documenting it.

Following the community response to the subscription-based YNAB announcement and launch over the last few months has been interesting to say the least. There are a lot of valid complaints from users that started their new <s>way of life</s> budget on a soon-to-be-deprecated piece of software without wanting to sign up to yet another recurring fee. There are others that don't wish to hand over their full transaction history to the YNAB cloud service. I fall into both of these categories.

By analysing the file structure and understanding it's format, we can open a path to a continuation of the desktop app.

## Starting off

I _could_ start off by looking through all of the files from the budget I've been running for the last year, but it looks like an awful place to start. Here's a sample of what's in there:

```
⋊> ~/p/p/o/s/Get That FI~D5ADEDBD.ynab4 ls -la
total 4164
drwxr-xr-x 1 jack jack   6266 Sep  8 19:16 ./
drwxr-xr-x 1 jack jack     52 Sep  8 19:16 ../
-rwxr--r-- 1 jack jack   1759 Jul  7  2015 Backup_2015-07-07T20-55-25_A_37FD3C36-7C59-A459-1374-69DF8CA2E4C2.y4backup*
-rwxr--r-- 1 jack jack  10966 Jul 27  2015 Backup_2015-07-27T20-41-37_A_37FD3C36-7C59-A459-1374-69DF8CA2E4C2.y4backup*
-rwxr--r-- 1 jack jack  21241 Aug 16  2015 Backup_2015-08-16T21-18-42_A_37FD3C36-7C59-A459-1374-69DF8CA2E4C2.y4backup*
-rwxr--r-- 1 jack jack  27481 Aug 31  2015 Backup_2015-08-31T21-22-17_A_37FD3C36-7C59-A459-1374-69DF8CA2E4C2.y4backup*
-rwxr--r-- 1 jack jack  34500 Sep 19  2015 Backup_2015-09-19T15-22-01_A_37FD3C36-7C59-A459-1374-69DF8CA2E4C2.y4backup*

[...]

-rwxr--r-- 1 jack jack 137969 Sep  8 10:07 Backup_2016-09-08T10-07-18_D_98495269-0858-59E5-0E27-E35FA72C4BDD.y4backup*
-rwxr--r-- 1 jack jack     94 Feb  9  2016 'Budget (x200'\''s conflicted copy 2016-02-09).ymeta'*
-rwxr--r-- 1 jack jack     94 Sep  8 10:07 Budget.ymeta*
drwxr-xr-x 1 jack jack    144 Sep  8 19:16 data1~1E8B33C5/
-rwxr--r-- 1 jack jack  82726 Mar 26 22:05 .folderIcon.ico*
-rwxr--r-- 1 jack jack    922 Nov  7  2015 readme.txt*

```

Where each one of those `.y4backup` files is a zip file containing a metadata XML file and a monster of a JSON dump with every transaction I've ever made. Since I sync my budget to my phone via dropbox there's also a conflicted file in there which can be ignored. The `readme.txt` contains nothing useful and the `Budget.ymeta` contains only metadata.

Everything on within this folder can be pretty safely ignored for now. The `data1~1E8B33C5/` folder is a little more interesting.

```shell_session
⋊> ~/p/p/o/s/G/data1~1E8B33C5 ls -la
total 0
drwxr-xr-x 1 jack jack   144 Sep  8 19:16 ./
drwxr-xr-x 1 jack jack  6266 Sep  8 19:16 ../
drwxr-xr-x 1 jack jack 12512 Sep  8 19:16 50A88693-1A89-3219-9D88-631CF77CE8DE/
drwxr-xr-x 1 jack jack  8784 Sep  8 19:16 7382CCAE-2025-312B-B98D-48FA3B336D41/
```

Or is it? There's no current hint at what either of those UUIDs mean and each of them contain a few too many files to not get overwhelmed.

```
⋊> ~/p/p/o/s/G/d/50A88693-1A89-3219-9D88-631CF77CE8DE ls -1 | wc -l
106
⋊> ~/p/p/o/s/G/d/7382CCAE-2025-312B-B98D-48FA3B336D41 ls -1 | wc -l
80
```

A sample of one of the files in these folders does provide a little hope since it is at least human-readable.

```json
⋊> ~/p/p/o/s/G/d/7382CCAE-2025-312B-B98D-48FA3B336D41 cat A-4800,B-19,C-1721,D-273,E-172,F-623,G-0_G-2.ydiff
{
  "budgetDataGUID": "data1~1E8B33C5",
  "dataVersion": "4.2",
  "deviceGUID": "7382CCAE-2025-312B-B98D-48FA3B336D41",
  "endVersion": "A-4800,B-19,C-1721,D-273,E-172,F-623,G-2",
  "formatVersion": null,
  "items": [
    {
      "entityId": "936727D6-CE1E-4729-9B94-EDB0683C2697",
      "entityType": "transaction",
      "entityVersion": "G-1",
      "madeWithKnowledge": null,
      "accountId": "577E88FF-0B76-97DE-838A-6A4E1D9CB84C",
      "amount": "-3.00",
      "categoryId": "A17",
      "checkNumber": "",
      "cleared": "Uncleared",
      "date": "2016-05-19",
      "flag": null,
      "isTombstone": false,
      "memo": null,
      "payeeId": "75955498-3566-194A-CEDE-7D9A509BFCC1",
      "targetAccountId": null,
      "transferTransactionId": null,
      "accepted": false,
      "dateEnteredFromSchedule": null
    }
  ],
  "publishTime": "19 May 2016 12:15:44 BST",
  "shortDeviceId": "G",
  "startVersion": "A-4800,B-19,C-1721,D-273,E-172,F-623,G-0"
}⏎
```

But at this point it starts to become apparent that it would be a better idea to just start one from scratch.

## Fresh start

When running YNAB under WINE the files are saved in the WINE drive_c directory, within the user's 'My Documents' directory. On my setup this has been symlinked to `/home/jack/Documents`.

Before the budget is first created, I need a way of storing budget changes, and I'd also like a way to step over these changes to see the affect of each user action. Initialising the Documents folder as a [git repository](https://github.com/jackturnbull/ynab4-file-structure) seems to be an easy fix. For ease, `/home/jack/Documents` has been cleared out prior to initialising the git repo. Running git for this type of task is an absolute god-send. It's like quick save in Oblivion levels of useful.

At this point it is worth going into the motivation behind this since it'll affect what I need to care about from this point onward. I want to learn and document enough of the file format to:

* Read and extract budget, category, account and transaction information.
* Create, update and delete any of the above.
* Maintain compatibility with YNAB.

Since this is all that matters for this exercise, a lot of the app-specific metadata and settings data can be discounted, providing compatibility is maintained.

![Budget creation screen](/images/2016-09-13-budget_create_screen.png)

After creating the budget there is a nice opportunity to commit the first set of changes.  While this would be one of the most useful places to start analysing the file format it is also the only place where it is possible to get _useful_ diffs when tweaking the project creation settings.

The approach for the rest of the blog post will be a process of documented trial and error. Specific tests will be ran in order to determine the change in the YNAB budget files, and then the outcome will be assessed per test. All of these tests have been logged in the [git repository](https://github.com/jackturnbull/ynab4-file-structure) and explained here. If you aren't interested in the analysis, and it is quite long, then head over to the [commit log](https://github.com/jackturnbull/ynab4-file-structure/commits/master) in order to see just the file changes.

### Test: Regenerate budget from fresh

All files appear to be the same content-wise, except for "relativeDataFolderName" in `Budget.ymeta` which contains a reference to the data directory of the budget.

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/Budget.ymeta b/YNAB/ReverseBudget~3F76EF73.ynab4/Budget.ymeta
index 2054a61..b0652af 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/Budget.ymeta
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/Budget.ymeta
@@ -1,5 +1,5 @@
 {
        "formatVersion": "2",
-       "relativeDataFolderName": "data1~DB3EA1D2",
+       "relativeDataFolderName": "data1~7E02C4E2",
        "TED": 1476273600000
 }
\ No newline at end of file

```

Interestingly, fields appear to be written in random order which can screw up the git diffs but the values are the same. Not all the IDs in the directory structure change either, those that do are in bold:

YNAB/ReverseBudget~**3F76EF73**.ynab4/data1~**DB3EA1D2**/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull

Since diffing by manually checking keys/values by hand will become tedious very quickly, [a json diffing](https://t-a-w.blogspot.co.uk/2016/05/sensible-git-diff-for-json-files.html) tool exists to help with this very problem. Installing this onto $PATH and telling git to diff via this tool for `.ymeta`, `.yfull` and `ydevice` removes much of the human error in diffing the files.

I'll be listing my assumptions in quote blocks as I go along:

> When given a budget directory, YNAB first reads `Budget.ymeta` to determine the budget's data directory before reading `Budget.yfull`

> The hex after the `data1~` is randomly generated.

#### SubTest: Change of budget name to default 'My Budget'

A `git diff` reveals no meaningful change within metadata. `grep` reveals no instances of string 'My Budget'. The only instance of the budget name is in the directory name prior to tilde.

> The name of the budget is only ever read from the directory name.

#### SubTest: Change of currency, symbol and location

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index df9213c..24a3fc0 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -8,8 +8,8 @@
   "budgetMetaData": {
     "budgetType": "Personal",
     "currencyISOSymbol": null,
-    "currencyLocale": "en_GB",
-    "dateLocale": "en_GB",
+    "currencyLocale": "en_US",
+    "dateLocale": "en_US",
     "entityId": "A2",
     "entityType": "budgetMetaData",
     "entityVersion": "A-0",
```

The currencyLocale and the dateLocale fields within `Budget.yfull` have changed to their new respective locales. Interestingly the currencyISOSymbol field has not changed, despite also repeating this test changing the currency format.

> Changing the currency, currency format and data format changes only the currencyLocale and the dateLocale fields.

### SubTest: Set the budget type to 'Small Business'

There were too many individual changes to usefully list in this blog so these have been omitted to the git repository. YNAB appears to have generated the list of budget categories from a separate source template.

* entityVersion, entityId, name and masterCategoryId has changed.
* budgetType within budgetMetaData has changed from 'Personal' to 'Business'.
* knowledge and knowledgeInFullBudgetFile within `A.ydevice` has changed to match last category name in `Budget.yfull` file.

> When generating a business budget, this is created from a seperate template.

### Test: Reopening the original budget

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/budgetSettings.ybsettings b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/budgetSettings.ybsettings
index 17c0274..52d0877 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/budgetSettings.ybsettings
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/budgetSettings.ybsettings
@@ -1,3 +1,8 @@
 <com.ynab.dataAccess.settings.MachineBudgetSettingsVO>
-       <extraDataObjects/>
+       <extraDataObjects>
+               <com.ynab.dataAccess.settings.GeneralAppSettingsForThisMachineVO>
+                       <offBudgetAccountContainerState>normal</offBudgetAccountContainerState>
+                       <onBudgetAccountContainerState>collapsed</onBudgetAccountContainerState>
+               </com.ynab.dataAccess.settings.GeneralAppSettingsForThisMachineVO>
+       </extraDataObjects>
 </com.ynab.dataAccess.settings.MachineBudgetSettingsVO>
```

Only state within the `budgetSettings.ybsettings` file has changed. This appears to hold the last known state of some of the accordions used in the YNAB interface.

> The state of the interface is stored within `budgetSettings.ybsettings`. This is not required to be present for a valid budget file, since the original file loaded fine without this.

### Test: Creating an account
One of the first actions you must do when using YNAB is to create an account that maps to one that you use in real life, such as a current account or savings account. Again, the git diff is quite big but here I've included most of it because of its importance.

An account object has appeared in the "accounts" key of `Budget.yfull`:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index df9213c..328d80e 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -3,7 +3,19 @@

   ],
   "accounts": [
-
+    {
+      "accountName": "Current Account",
+      "accountType": "Checking",
+      "entityId": "379007EF-3A3E-B46A-AA18-1E551E782455",
+      "entityType": "account",
+      "entityVersion": "A-64",
+      "hidden": false,
+      "lastEnteredCheckNumber": -1,
+      "lastReconciledBalance": 0,
+      "lastReconciledDate": null,
+      "onBudget": true,
+      "sortableIndex": 0
+    }
```

A payees object has appeared in the "payees" key of `Budget.yfull`:

```diff
@@ -643,12 +655,47 @@
     }
   ],
   "payees": [
-
+    {
+      "autoFillAmount": 0,
+      "autoFillCategoryId": null,
+      "autoFillMemo": null,
+      "enabled": true,
+      "entityId": "Payee/Transfer:379007EF-3A3E-B46A-AA18-1E551E782455",
+      "entityType": "payee",
+      "entityVersion": "A-65",
+      "locations": null,
+      "name": "Transfer : Current Account",
+      "renameConditions": null,
+      "targetAccountId": "379007EF-3A3E-B46A-AA18-1E551E782455"
+    },
+    {
+      "autoFillAmount": 0,
+      "autoFillCategoryId": null,
+      "autoFillMemo": null,
+      "enabled": false,
+      "entityId": "0D461A99-7BB2-766F-38AE-1E551E9E0C4E",
+      "entityType": "payee",
+      "entityVersion": "A-67",
+      "locations": null,
+      "name": "Starting Balance",
+      "renameConditions": null
+    }
   ],
   "scheduledTransactions": [
```

A transactions object has appeared in the "transactions" key of `Budget.yfull`:

```diff
   "transactions": [
-
+    {
+      "accepted": true,
+      "accountId": "379007EF-3A3E-B46A-AA18-1E551E782455",
+      "amount": 0,
+      "categoryId": "Category/__ImmediateIncome__",
+      "cleared": "Cleared",
+      "date": "2016-09-12",
+      "entityId": "2C6FD5E0-54DE-6429-D2B6-1E551E93A489",
+      "entityType": "transaction",
+      "entityVersion": "A-66",
+      "payeeId": "0D461A99-7BB2-766F-38AE-1E551E9E0C4E"
+    }
   ]
 }
```

A new file has appeared at `YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-63_A-67.ydiff`:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-63_A-67.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-63_A-67.ydiff
new file mode 100644
index 0000000..4b80b76
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-63_A-67.ydiff
@@ -0,0 +1,85 @@
+{
+  "shortDeviceId": "A",
+  "startVersion": "A-63",
+  "endVersion": "A-67",
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "publishTime": "Mon Sep 12 13:18:01 GMT+0100 2016",
+  "budgetDataGUID": null,
+  "formatVersion": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "entityType": "account",
+      "lastReconciledDate": null,
+      "lastEnteredCheckNumber": -1,
+      "lastReconciledBalance": 0,
+      "accountType": "Checking",
+      "note": null,
+      "hidden": false,
+      "sortableIndex": 0,
+      "onBudget": true,
+      "accountName": "Current Account",
+      "isTombstone": false,
+      "entityVersion": "A-64",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "entityId": "379007EF-3A3E-B46A-AA18-1E551E782455"
+    },
+    {
+      "entityType": "payee",
+      "autoFillCategoryId": null,
+      "autoFillAmount": 0,
+      "name": "Transfer : Current Account",
+      "autoFillMemo": null,
+      "targetAccountId": "379007EF-3A3E-B46A-AA18-1E551E782455",
+      "enabled": true,
+      "isTombstone": false,
+      "entityVersion": "A-65",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "entityId": "Payee/Transfer:379007EF-3A3E-B46A-AA18-1E551E782455"
+    },
+    {
+      "entityType": "transaction",
+      "entityId": "2C6FD5E0-54DE-6429-D2B6-1E551E93A489",
+      "targetAccountId": null,
+      "transferTransactionId": null,
+      "categoryId": "Category/__ImmediateIncome__",
+      "payeeId": "0D461A99-7BB2-766F-38AE-1E551E9E0C4E",
+      "amount": 0,
+      "date": "2016-09-12",
+      "isTombstone": false,
+      "accountId": "379007EF-3A3E-B46A-AA18-1E551E782455",
+      "entityVersion": "A-66",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "parentTransactionIdIfMatched": null,
+      "memo": null,
+      "cleared": "Cleared",
+      "source": null,
+      "dateEnteredFromSchedule": null,
+      "checkNumber": null,
+      "flag": null,
+      "importedPayee": null,
+      "accepted": true,
+      "subTransactions": null,
+      "matchedTransactions": null,
+      "YNABID": null,
+      "FITID": null
+    },
+    {
+      "entityType": "payee",
+      "autoFillCategoryId": null,
+      "autoFillAmount": 0,
+      "name": "Starting Balance",
+      "autoFillMemo": null,
+      "targetAccountId": null,
+      "enabled": false,
+      "isTombstone": false,
+      "entityVersion": "A-67",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "entityId": "0D461A99-7BB2-766F-38AE-1E551E9E0C4E"
+    }
+  ]
+}
```

Cached balances of all categories has been set to 0:

```diff
@@ -44,7 +56,7 @@
       "sortableIndex": 1879048191,
       "subCategories": [
         {
-          "cachedBalance": null,
+          "cachedBalance": 0,
```

The knowledgeInFullBudgetFile has been updated:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/devices/A.ydevice b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/devices/A.ydevice
index d2eea60..4488ebc 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/devices/A.ydevice
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/devices/A.ydevice
@@ -7,7 +7,7 @@
   "hasFullKnowledge": true,
   "highestDataVersionImported": null,
   "knowledge": "A-67",
-  "knowledgeInFullBudgetFile": "A-63",
+  "knowledgeInFullBudgetFile": "A-67",
   "lastDataVersionFullyKnown": "4.2",
   "shortDeviceId": "A"
 }
```

And a lot of information has been added to the `budgetSettings.ybsettings` file. This also seems to be interface related and mainly contains grid sizing and column widths.

> All budget information is stored in `Budget.yfull` including accounts, payees and transactions.

> The `*.ydiff` files are used to sync information between devices and contain all the information needed to recreate the budget to the version specified within the endVersion field.

> YNAB budgets are deemed to be in-sync if the device contains an knowledgeInBudgetFile equal to the currentKnowledge.

> A transaction is a join between a payee and an account.

#### SubTest: Can YNAB survive without the budgetSettings.ybsettings file?

As we saw in the 'Reopen original budget' test, the ybsettings file was regerated when YNAB reopened the budget. This test is valuable because if YNAB can regenerate a default `budgetSettings.ybsettings` file then it would mean that any program that wished to interact with the YNAB budget wouldn't need to care about maintaining the state of this file.

Removing `budgetSetting.ybsettings` did not affect YNAB's ability to open the budget. Interestingly the file was only re-generated when YNAB was closed, not when it was still running.

> YNAB does not need the ybsettings file in order to work on a budget.

> YNAB stores its state in the ybsettings file so any other program reading the budget file does not need to care about this file.

#### SubTest: Creating a new account with different properties

To save time I created a new account with completely different properties; new name, different starting balance, different type and off-budget.

The properties of the account have changed, to expected values:

```diff
iff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 328d80e..3e22649 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -4,16 +4,16 @@
   ],
   "accounts": [
     {
-      "accountName": "Current Account",
-      "accountType": "Checking",
-      "entityId": "379007EF-3A3E-B46A-AA18-1E551E782455",
+      "accountName": "Savings Account",
+      "accountType": "Savings",
+      "entityId": "629E514D-6509-2EB6-A9A7-1E9D5B685851",
       "entityType": "account",
       "entityVersion": "A-64",
       "hidden": false,
       "lastEnteredCheckNumber": -1,
       "lastReconciledBalance": 0,
       "lastReconciledDate": null,
-      "onBudget": true,
+      "onBudget": false,
       "sortableIndex": 0
     }
   ],
```

It was here that I noticed that the `Budget.yfull` file only updated on close of YNAB although the ydiff was created immediately, the associated git repository has been updated for the parent test and split into two commits; one before close and one after.

> Changes are only synced to Budget.yfull when YNAB is closed.

> entityId is a UUID that is generated for each new account.

### Test: Closing an account

![Account edit screen](/images/2016-09-13-account_edit_screen.png)

It'll be interesting to see how YNAB handles deletions of accounts as transactions will depend on an account. My gut feeling from using YNAB is that all transactions must be removed from an account prior to deletion, which hints at the account being permenantly removed from `Budget.yfull`.

Before the account can be deleted it must be closed, which it lets us do without deleting any transactions. As expected, a new ydiff has been created.

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-67_A-69.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-67_A-69.ydiff
new file mode 100644
index 0000000..e2caa41
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-67_A-69.ydiff
@@ -0,0 +1,43 @@
+{
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "shortDeviceId": "A",
+  "formatVersion": null,
+  "budgetDataGUID": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "sortableIndex": 0,
+      "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "entityType": "account",
+      "entityVersion": "A-68",
+      "isTombstone": false,
+      "isResolvedConflict": false,
+      "note": "",
+      "accountName": "Savings Account",
+      "madeWithKnowledge": null,
+      "lastReconciledDate": null,
+      "lastEnteredCheckNumber": -1,
+      "accountType": "Savings",
+      "onBudget": false,
+      "lastReconciledBalance": 0,
+      "hidden": true
+    },
+    {
+      "targetAccountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "name": "Transfer : Savings Account",
+      "entityId": "Payee/Transfer:8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "entityType": "payee",
+      "entityVersion": "A-69",
+      "isTombstone": false,
+      "madeWithKnowledge": null,
+      "enabled": false,
+      "isResolvedConflict": false,
+      "autoFillCategoryId": null,
+      "autoFillMemo": null,
+      "autoFillAmount": 0
+    }
+  ],
+  "startVersion": "A-67",
+  "endVersion": "A-69",
+  "publishTime": "Mon Sep 12 15:28:25 GMT+0100 2016"
+}
```

It appears that there are two diff items required to close an account; one for making the account property "hidden" equal to true, and another to disable the mandatory transfer payee. This can be tested by closing YNAB and seeing the effect on `Budget.yfull`.

The account has been set to hidden and the entity version has been updated to match the changes in the diff file:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 3b9a26a..bb61522 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -3,18 +3,18 @@

   ],
   "accounts": [
     {
       "accountName": "Savings Account",
       "accountType": "Savings",
       "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "entityType": "account",
-      "entityVersion": "A-64",
-      "hidden": false,
+      "entityVersion": "A-68",
+      "hidden": true,
       "lastEnteredCheckNumber": -1,
       "lastReconciledBalance": 0,
       "lastReconciledDate": null,
       "onBudget": false,
       "sortableIndex": 0
     }
   ],
   "budgetMetaData": {
```

The payee has been disabled:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 3b9a26a..bb61522 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -3,18 +3,18 @@

   ],
   "accounts": [
     {
       "accountName": "Savings Account",
       "accountType": "Savings",
       "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "entityType": "account",
-      "entityVersion": "A-64",
-      "hidden": false,
+      "entityVersion": "A-68",
+      "hidden": true,
       "lastEnteredCheckNumber": -1,
       "lastReconciledBalance": 0,
       "lastReconciledDate": null,
       "onBudget": false,
       "sortableIndex": 0
     }
   ],
   "budgetMetaData": {
```

And the current knowledge has been updated to reflect the latest entityVersion within the diff file:

```diff
@@ -30,5 +30,5 @@
   "fileMetaData": {
     "budgetDataVersion": "4.2",
-    "currentKnowledge": "A-67",
+    "currentKnowledge": "A-69",
     "entityType": "fileMetaData"
   },
```

> Closing the account sets the account status to hidden and disables the payee.

> When YNAB is syncing the diffs, this is done in order of the items within the diff file and each field is then updated if a change is detected.

### Test: Reopening an account

The properties have been returned to their old values of account `"hidden": false` and payee `"enabled": true`. Interestingly enough, the order of the items in the diff were not reversed. The account was set to not hidden in the first item and the second was to enable the payee.

> The order of disabling/enabling payee prior to setting the account as hidden does not matter, even if the items are ran in order.

### Test: Creating a master category

The diff file contains all the data needed to create the category:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-69_A-70.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-69_A-70.ydiff
new file mode 100644
index 0000000..b207eeb
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-69_A-70.ydiff
@@ -0,0 +1,26 @@
+{
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "shortDeviceId": "A",
+  "formatVersion": null,
+  "budgetDataGUID": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "sortableIndex": 1744830463,
+      "name": "New Master Category",
+      "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
+      "entityType": "masterCategory",
+      "note": null,
+      "entityVersion": "A-70",
+      "isTombstone": false,
+      "isResolvedConflict": false,
+      "madeWithKnowledge": null,
+      "type": "OUTFLOW",
+      "expanded": true,
+      "deleteable": true
+    }
+  ],
+  "startVersion": "A-69",
+  "endVersion": "A-70",
+  "publishTime": "Mon Sep 12 16:39:04 GMT+0100 2016"
+}
```

And when the diff files are processed into `Budget.yfull`:

```diff
@@ -407,6 +407,17 @@
         }
       ],
       "type": "OUTFLOW"
+    },
+    {
+      "deleteable": true,
+      "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
+      "entityType": "masterCategory",
+      "entityVersion": "A-70",
+      "expanded": true,
+      "name": "New Master Category",
+      "sortableIndex": 1744830463,
+      "subCategories": null,
+      "type": "OUTFLOW"
     }
   ],
   "monthlyBudgets": [
```

> If the entityId is not found for the given entityType, then the entity is created.

### Test: Moving the master category

From the previous JSON diff it appears that "sortableIndex" is used to sort the categories in the budget list, although the integers used are quite large. At a guess, it looks like the sortableIndex field is a random number somewhere between the previous and following master categories.

Moving the category to another location in the budget demonstrates this:

```diff
@@ -412,10 +412,10 @@
       "deleteable": true,
       "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
       "entityType": "masterCategory",
-      "entityVersion": "A-70",
+      "entityVersion": "A-71",
       "expanded": true,
       "name": "New Master Category",
-      "sortableIndex": 1744830463,
+      "sortableIndex": 2046820351,
       "subCategories": null,
       "type": "OUTFLOW"
     }
```

The sortableIndex for the previous master category is 2013265919 and 2080374783 for the following master category. Within example subcategories generated by YNAB when creating the project there are sortableIndex values both lower and greater than the ones found in the master categories.

> sortableIndex is used to sort budget categories.

> Master categories are first sorted against other master categories by sortableIndex and then its subcategories are ordered by their sortableIndex.

> sortableIndex is randomly generated somewhere between the previous and following items in the list.

### Test: Creating a subcategory

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-71_A-73.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-71_A-73.ydiff
new file mode 100644
index 0000000..7d44532
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-71_A-73.ydiff
@@ -0,0 +1,40 @@
+{
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "shortDeviceId": "A",
+  "formatVersion": null,
+  "budgetDataGUID": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "sortableIndex": 0,
+      "name": "New Category",
+      "entityId": "70A3E42F-9B31-6623-7227-1F216D7F55B7",
+      "entityType": "category",
+      "note": null,
+      "entityVersion": "A-72",
+      "isTombstone": false,
+      "cachedBalance": null,
+      "masterCategoryId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
+      "isResolvedConflict": false,
+      "madeWithKnowledge": null,
+      "type": "OUTFLOW"
+    },
+    {
+      "sortableIndex": 2046820351,
+      "name": "New Master Category",
+      "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
+      "entityType": "masterCategory",
+      "note": null,
+      "entityVersion": "A-73",
+      "isTombstone": false,
+      "isResolvedConflict": false,
+      "madeWithKnowledge": null,
+      "type": "OUTFLOW",
+      "expanded": true,
+      "deleteable": true
+    }
+  ],
+  "startVersion": "A-71",
+  "endVersion": "A-73",
+  "publishTime": "Mon Sep 12 17:01:09 GMT+0100 2016"
+}
```

And the change to `Budget.yfull`:

```diff
@@ -412,11 +412,22 @@
       "deleteable": true,
       "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
       "entityType": "masterCategory",
-      "entityVersion": "A-71",
+      "entityVersion": "A-73",
       "expanded": true,
       "name": "New Master Category",
       "sortableIndex": 2046820351,
-      "subCategories": null,
+      "subCategories": [
+        {
+          "cachedBalance": null,
+          "entityId": "70A3E42F-9B31-6623-7227-1F216D7F55B7",
+          "entityType": "category",
+          "entityVersion": "A-72",
+          "masterCategoryId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
+          "name": "New Category",
+          "sortableIndex": 0,
+          "type": "OUTFLOW"
+        }
+      ],
       "type": "OUTFLOW"
     }
   ],
```

> subcategories are inserted into the master category using the masterCategoryId in the item.

### Test: Allocating an amount to a category

Since I have a rough understanding of what's going on with the ydiff files, I'm going to leave these out of the blog unless they provide something of value.

Within "monthlyBudgets" in `Budget.yfull`, the "monthlySubcategoryBudget" has been updated to include an entry:

```diff
@@ -438,7 +438,15 @@
       "entityVersion": "A-37",
       "month": "2016-09-01",
       "monthlySubCategoryBudgets": [
-
+        {
+          "budgeted": 100,
+          "categoryId": "A8",
+          "entityId": "MCB/2016-09/A8",
+          "entityType": "monthlyCategoryBudget",
+          "entityVersion": "A-74",
+          "overspendingHandling": null,
+          "parentMonthlyBudgetId": "MB/2016-09"
+        }
       ]
     },
     {
```

The cached balance of the subcategory has been set to 0:

```diff
@@ -418,7 +418,7 @@
       "sortableIndex": 2046820351,
       "subCategories": [
         {
-          "cachedBalance": null,
+          "cachedBalance": 0,
           "entityId": "70A3E42F-9B31-6623-7227-1F216D7F55B7",
           "entityType": "category",
           "entityVersion": "A-72",
```

> The budget is written to using the "parentMonthlyBudgetId" in the ydiff

### Test: Allocating a different amount to the same category

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 05460e3..6e94641 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -29,7 +29,7 @@
   },
   "fileMetaData": {
     "budgetDataVersion": "4.2",
-    "currentKnowledge": "A-74",
+    "currentKnowledge": "A-75",
     "entityType": "fileMetaData"
   },
   "masterCategories": [
@@ -439,11 +439,11 @@
       "month": "2016-09-01",
       "monthlySubCategoryBudgets": [
         {
-          "budgeted": 100,
+          "budgeted": 200,
           "categoryId": "A8",
           "entityId": "MCB/2016-09/A8",
           "entityType": "monthlyCategoryBudget",
-          "entityVersion": "A-74",
+          "entityVersion": "A-75",
           "overspendingHandling": null,
           "parentMonthlyBudgetId": "MB/2016-09"
         }
```

Not much to report here other than the budgeted amount has changed along with the entity version.

> The entity version of an object is updated on every entity change.

### Test: Adding a category note

YNAB supports adding notes to the category. The note is saved directly onto the object:

```diff
@@ -91,9 +91,10 @@
           "cachedBalance": 0,
           "entityId": "A8",
           "entityType": "category",
-          "entityVersion": "A-6",
+          "entityVersion": "A-76",
           "masterCategoryId": "A7",
           "name": "Rent/Mortgage",
+          "note": "Test Note",
           "sortableIndex": 0,
           "type": "OUTFLOW"
         },
```

### Test: Making a budget 'On Budget'

Since I'd left the 'Savings Account' account off-budget, any transactions created on this budget would not show up against the monthly budget amounts. By making it an on-budget account a transaction that will act against the budget can be added.

Changing the account to budget changes a flag within `Budget.yfull`:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 21ecf1a..04dc722 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -8,12 +8,12 @@
       "accountType": "Savings",
       "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "entityType": "account",
-      "entityVersion": "A-68",
+      "entityVersion": "A-77",
       "hidden": true,
       "lastEnteredCheckNumber": -1,
       "lastReconciledBalance": 0,
       "lastReconciledDate": null,
-      "onBudget": false,
+      "onBudget": true,
       "sortableIndex": 0
     }
   ],
```

The account already has a transaction for the starting balance, causing a warning message to show stating that the transaction does not have a category.

> All transactions for an on budget account should have a category, although they can be created without one.

### Test: Adding a category to an existing transaction

To remove the previous warning, a category needs adding to the transaction. This has been added as income for the following month.

The categoryId was the only changed field in this case:

```diff
@@ -720,12 +720,12 @@
       "accepted": true,
       "accountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "amount": 10,
-      "categoryId": null,
+      "categoryId": "Category/__DeferredIncome__",
       "cleared": "Cleared",
       "date": "2016-09-11",
       "entityId": "E8395288-6E88-4CA4-FF86-1EC5EB1FEC65",
       "entityType": "transaction",
-      "entityVersion": "A-66",
+      "entityVersion": "A-78",
       "payeeId": "9E6C8D20-14B3-FD47-7599-1EC5EB28562C"
     }
   ]
```

> `Category/__ImmediateIncome__` is the internal category name for income 'Available this month'.

> `Category/__DeferredIncome__` is the internal category name for income 'Available next month'.

### Test: Unclearing a transaction

```diff
@@ -721,11 +721,11 @@
       "accountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "amount": 10,
       "categoryId": "Category/__DeferredIncome__",
-      "cleared": "Cleared",
+      "cleared": "Uncleared",
       "date": "2016-09-11",
       "entityId": "E8395288-6E88-4CA4-FF86-1EC5EB1FEC65",
       "entityType": "transaction",
-      "entityVersion": "A-78",
+      "entityVersion": "A-79",
       "payeeId": "9E6C8D20-14B3-FD47-7599-1EC5EB28562C"
     }
   ]
```

As simple as changing the key "cleared" to "Uncleared". It's somewhat interesting that this was done as a string rather than a boolean flag. Could there have been the intention to add more values to this?

### Test: Creating a transaction for a new payee

As expected, a new payee has been added:

```diff
@@ -710,6 +710,18 @@
       "locations": null,
       "name": "Starting Balance",
       "renameConditions": null
+    },
+    {
+      "autoFillAmount": -300,
+      "autoFillCategoryId": "A8",
+      "autoFillMemo": "",
+      "enabled": true,
+      "entityId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D",
+      "entityType": "payee",
+      "entityVersion": "A-80",
+      "locations": null,
+      "name": "New Payee",
+      "renameConditions": null
     }
   ],
```

As well as a new transaction linking the payee's entityId to the account's entityId:

```diff
@@ -710,6 +710,18 @@
       "locations": null,
       "name": "Starting Balance",
       "renameConditions": null
+    },
+    {
+      "autoFillAmount": -300,
+      "autoFillCategoryId": "A8",
+      "autoFillMemo": "",
+      "enabled": true,
+      "entityId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D",
+      "entityType": "payee",
+      "entityVersion": "A-80",
+      "locations": null,
+      "name": "New Payee",
+      "renameConditions": null
     }
   ],
```

> autoFillAmount and autoFillCategory are used to autofill the amount and category of the transaction when entering new transactions for the payee.

### Test: Creating a transaction for an existing payee

Even when adding a transaction for an existing payee, there is a payee item in the diff file for updating the autofill values:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-81_A-83.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-81_A-83.ydiff
new file mode 100644
index 0000000..8668053
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-81_A-83.ydiff
@@ -0,0 +1,54 @@
+{
+  "shortDeviceId": "A",
+  "startVersion": "A-81",
+  "endVersion": "A-83",
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "publishTime": "Mon Sep 12 17:56:00 GMT+0100 2016",
+  "budgetDataGUID": null,
+  "formatVersion": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "entityType": "payee",
+      "autoFillCategoryId": "A8",
+      "autoFillAmount": -100,
+      "name": "New Payee",
+      "autoFillMemo": "",
+      "targetAccountId": null,
+      "enabled": true,
+      "isTombstone": false,
+      "entityVersion": "A-82",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "entityId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D"
+    },
+    {
+      "entityType": "transaction",
+      "entityId": "14D01A0D-663D-C3F6-DFD1-1F5381331AFB",
+      "targetAccountId": null,
+      "transferTransactionId": null,
+      "categoryId": "A8",
+      "payeeId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D",
+      "amount": -100,
+      "date": "2016-09-12",
+      "isTombstone": false,
+      "accountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "entityVersion": "A-83",
+      "madeWithKnowledge": null,
+      "isResolvedConflict": false,
+      "parentTransactionIdIfMatched": null,
+      "memo": null,
+      "cleared": "Uncleared",
+      "source": null,
+      "dateEnteredFromSchedule": null,
+      "checkNumber": null,
+      "flag": null,
+      "importedPayee": null,
+      "accepted": true,
+      "subTransactions": null,
+      "matchedTransactions": null,
+      "YNABID": null,
+      "FITID": null
+    }
+  ]
+}
```

Other than that, the transaction has been created as expected:

```diff
@@ -751,6 +751,18 @@
       "entityType": "transaction",
       "entityVersion": "A-81",
       "payeeId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D"
+    },
+    {
+      "accepted": true,
+      "accountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "amount": -100,
+      "categoryId": "A8",
+      "cleared": "Uncleared",
+      "date": "2016-09-12",
+      "entityId": "14D01A0D-663D-C3F6-DFD1-1F5381331AFB",
+      "entityType": "transaction",
+      "entityVersion": "A-83",
+      "payeeId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D"
     }
   ]
 }

```

> Whenever creating a transaction in which the amount or category has changed for the payee, the payee will also be updated.

### Test: Deleting a transaction

Interestingly the transaction has not been deleted from YNAB, rather the "isTombstone" flag has been set to true.

```diff
@@ -749,7 +749,8 @@
       "date": "2016-09-12",
       "entityId": "1A473992-12B9-1453-2547-1F4F7FD0454A",
       "entityType": "transaction",
-      "entityVersion": "A-81",
+      "entityVersion": "A-84",
+      "isTombstone": true,
       "payeeId": "0E6625CB-AD64-93A0-F02A-1F4FF731A14D"
     },
     {
```

This is not to say they won't be deleted at all because they could still be garbage collected by YNAB at a later date, but I'll still list it as an assumption for now.

> Deleted transactions are not deleted but have their "isTombstone" flag set to true.

### Test: Deleting a subcategory

Much like deleting a transaction, the "isTombstone" flag has been set to true.

```diff
@@ -422,7 +422,8 @@
           "cachedBalance": 0,
           "entityId": "70A3E42F-9B31-6623-7227-1F216D7F55B7",
           "entityType": "category",
-          "entityVersion": "A-72",
+          "entityVersion": "A-85",
+          "isTombstone": true,
           "masterCategoryId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
           "name": "New Category",
           "sortableIndex": 0,
```

> Deleted categories are not deleted but have their "isTombstone" flag set to true.

### Test: Deleting a master category

You can guess where this is going.

```diff
@@ -413,8 +413,9 @@
       "deleteable": true,
       "entityId": "EBEFE956-060C-8A91-006B-1F0D2EED6D8F",
       "entityType": "masterCategory",
-      "entityVersion": "A-73",
+      "entityVersion": "A-86",
       "expanded": true,
+      "isTombstone": true,
       "name": "New Master Category",
       "sortableIndex": 2046820351,
       "subCategories": [
```

> Deleted categories are not deleted but have their "isTombstone" flag set to true.

### Test: Rollover budgets to next month

Whenever a budget is over the amount allocated to it the user is given two options:

* Subtract the overflow amount from next month's total budget.
* Rollover the amount onto the same category next month.

![Budget rollover type](/images/2016-09-13-budget_rollover_type.png)

The purpose of this test is to check the field value when rolling over.

```diff
@@ -446,8 +446,8 @@
           "categoryId": "A8",
           "entityId": "MCB/2016-09/A8",
           "entityType": "monthlyCategoryBudget",
-          "entityVersion": "A-87",
-          "overspendingHandling": null,
+          "entityVersion": "A-88",
+          "overspendingHandling": "Confined",
           "parentMonthlyBudgetId": "MB/2016-09"
         }
       ]
```

And we can now see that the value is set to "Confined", where it used to be null.

### Test: Deleting an account

In order to delete an account, all transactions for that account must also be deleted. This has been done prior to running this test.

![Account deletion warning](/images/2016-09-13-account_deletion_warning.png)

Despite the warning it appears that the account has been made into a tombstone, along with the 'transfer' payee:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-90_A-92.ydiff b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-90_A-92.ydiff
new file mode 100644
index 0000000..db168b7
--- /dev/null
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/A-90_A-92.ydiff
@@ -0,0 +1,43 @@
+{
+  "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
+  "shortDeviceId": "A",
+  "formatVersion": null,
+  "budgetDataGUID": null,
+  "dataVersion": "4.2",
+  "items": [
+    {
+      "sortableIndex": 0,
+      "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "entityType": "account",
+      "entityVersion": "A-91",
+      "isTombstone": true,
+      "isResolvedConflict": false,
+      "note": null,
+      "accountName": "Savings Account",
+      "madeWithKnowledge": null,
+      "lastReconciledDate": null,
+      "lastEnteredCheckNumber": -1,
+      "accountType": "Savings",
+      "onBudget": true,
+      "lastReconciledBalance": 0,
+      "hidden": true
+    },
+    {
+      "targetAccountId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "name": "Transfer : Savings Account",
+      "entityId": "Payee/Transfer:8149D264-B711-6E98-B1B3-1EC5EB08B306",
+      "entityType": "payee",
+      "entityVersion": "A-92",
+      "isTombstone": true,
+      "madeWithKnowledge": null,
+      "enabled": false,
+      "isResolvedConflict": false,
+      "autoFillCategoryId": null,
+      "autoFillMemo": null,
+      "autoFillAmount": 0
+    }
+  ],
+  "startVersion": "A-90",
+  "endVersion": "A-92",
+  "publishTime": "Mon Sep 12 19:08:26 GMT+0100 2016"
+}
```

And in `Budget.yfull`:

```diff
diff --git a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
index 249ee50..4fa528f 100644
--- a/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
+++ b/YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/Budget.yfull
@@ -8,8 +8,9 @@
       "accountType": "Savings",
       "entityId": "8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "entityType": "account",
-      "entityVersion": "A-77",
+      "entityVersion": "A-91",
       "hidden": true,
+      "isTombstone": true,
       "lastEnteredCheckNumber": -1,
       "lastReconciledBalance": 0,
       "lastReconciledDate": null,
@@ -29,7 +30,7 @@
   },
   "fileMetaData": {
     "budgetDataVersion": "4.2",
-    "currentKnowledge": "A-90",
+    "currentKnowledge": "A-92",
     "entityType": "fileMetaData"
   },
   "masterCategories": [
@@ -695,7 +696,8 @@
       "enabled": false,
       "entityId": "Payee/Transfer:8149D264-B711-6E98-B1B3-1EC5EB08B306",
       "entityType": "payee",
-      "entityVersion": "A-69",
+      "entityVersion": "A-92",
+      "isTombstone": true,
       "locations": null,
       "name": "Transfer : Savings Account",
       "renameConditions": null,
```

### Test: Deleting everything except Budget.yfull, Budget.ymeta and A.ydevice

This test was almost skipped but in doing so there has been a valuable assumption made about the way YNAB reads a budget directory. The purpose of this test was to reduce the budget directory to as few files as possible while still having YNAB successfully load the budget. There are some files which look like they can be safely discarded without worrying; `desktop.ini` and `readme.txt` are the first contestants for that.

Although largely ignored throughout this exercise it also appears that all `.y4backup` files can also be deleted, along with the diff files **as long as the budget has full knowledge**. Whether a given device has full knowledge or not can be determined using the ydevice file within the devices folder of the budget.

The full list of commands ran to remove all excess files:

```
rm YNAB/ReverseBudget~3F76EF73.ynab4/*.y4backup
rm YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/*.ydiff
rm YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/97CDEFF6-422F-D9C0-EFC7-0B1384412358/*.ybsettings
rm YNAB/ReverseBudget~3F76EF73.ynab4/desktop.ini
rm YNAB/ReverseBudget~3F76EF73.ynab4/readme.txt
```

Even though YNAB will still function as expected when those files are removed, there's one more piece of the puzzle that is missing. Taking a look at `A.ydevice` reveals that the "deviceGUID" matches that of the folder in which all the budget files are stored:

```json
{
        "friendlyName": "rvz02",
        "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358",
        "shortDeviceId": "A",
        "formatVersion": "1.2",
        "knowledge": "A-92",
        "knowledgeInFullBudgetFile": "A-92",
        "YNABVersion": "Desktop version: YNAB 4 v4.3.857 (com.ynab.YNAB4.LiveCaptive), AIR Version: 4.0.0.1390",
        "hasFullKnowledge": true,
        "lastDataVersionFullyKnown": "4.2",
        "deviceType": "Desktop (AIR), OS:Windows XP 64",
        "highestDataVersionImported": null
}
```

Remember when I said I'd been running a budget for a year or so, but the files were a little too complex to process without first understanding a bit more? Well, now is a good time to dig a little deeper and what the output is for other devices.

`A.ydevice` from my other budget:

```json
{
        "deviceType": "Desktop (AIR), OS:Windows XP 64",
        "knowledgeInFullBudgetFile": "A-6744,B-19,C-1721,D-458,E-172,F-623,G-109,H-230",
        "friendlyName": "x200",
        "deviceGUID": "37FD3C36-7C59-A459-1374-69DF8CA2E4C2",
        "hasFullKnowledge": true,
        "formatVersion": "1.2",
        "knowledge": "A-6744,B-19,C-1721,D-458,E-172,F-623,G-109,H-230",
        "highestDataVersionImported": "4.2",
        "shortDeviceId": "A",
        "YNABVersion": "Desktop version: YNAB 4 v4.3.857 (com.ynab.YNAB4.LiveCaptive), AIR Version: 4.0.0.1390",
        "lastDataVersionFullyKnown": "4.2"
}
```

`B.ydevice` from my other budget:

```json
{
  "YNABVersion": "Android build 3.2.0",
  "deviceGUID": "F562ADE7-8344-38CC-BC05-3421871F38DE",
  "deviceType": "Android",
  "formatVersion": "1.2",
  "friendlyName": "GT-I9505",
  "hasFullKnowledge": false,
  "highestDataVersionImported": "4.2",
  "knowledge": "A-178,B-19",
  "knowledgeInFullBudgetFile": null,
  "lastDataVersionFullyKnown": "4.2",
  "shortDeviceId": "B"
}
```

The mixed indentation is present on the source files.

The directories that match the UUIDs in the ydevice files are also present in my day-to-day budget. What is interesting is that even though I have managed to add other devices to my other budget, why doesn't YNAB load the budget when removing `A.ydevice`?

How about if the deviceGUID is changed, along with the directory name? Bingo! A new device file has appeared; `B.ydevice`. The contents of this file are exatly the same as `A.ydevice` was previously, along with the same UUID:

```json
{
        "friendlyName": "rvz02",
        "knowledgeInFullBudgetFile": null,
        "YNABVersion": "Desktop version: YNAB 4 v4.3.857 (com.ynab.YNAB4.LiveCaptive), AIR Version: 4.0.0.1390",
        "lastDataVersionFullyKnown": "4.2",
        "deviceType": "Desktop (AIR), OS:Windows XP 64",
        "knowledge": "A-92",
        "highestDataVersionImported": null,
        "shortDeviceId": "B",
        "formatVersion": "1.2",
        "hasFullKnowledge": false,
        "deviceGUID": "97CDEFF6-422F-D9C0-EFC7-0B1384412358"
}
```

The way YNAB initializes itself is by first scanning the `Documents/YNAB` directory. All directories within here will be represented as budgets within YNAB.

If you have multiple budgets then you'll be given a list of budgets to select from. When the budget is selected (or defaulted to) then it loads `[budgetName]/Budget.ymeta` to get the relativeDataFolderName. In our example throughout, this has always been `data1~DB3EA1D2`. Since the "deviceGUID" is always the same on each device, YNAB now searches through all ydevice files in `YNAB/ReverseBudget~3F76EF73.ynab4/data1~DB3EA1D2/devices/` to see if it can find a file for the current device.

If it can then it will load the `Budget.yfull` file from the matching directory.

If it can't find a match, then it will create a new ydevice file and represent it as a new device in the budget.

This is important for an app that reads and writes from a `Budget.yfull` file, as it can do it one of two ways:

1. Detect the deviceGUID present in the device file that has a hasFullKnowledge value of true, and find the equivalent `Budget.yfull` and read/write directly from/to that file.
2. Integrate with YNAB as a new device and implement a mechanism for compiling a `Budget.yfull` from other devices.

Option 1 makes it quick and easy to read and write YNAB files but will be unable to create them unless the "deviceGUID" generation mechanism is known. Option 2 allows for creation and use with multiple devices but requires a deeper understanding of how YNAB handles merges and differentials between devices.

## Summary

I'll not blame you if you've skipped most of that and headed straight here for the summary. A lot of the above is primarily documentation for myself after all. So, what has been learned:

* YNAB implements its own syncing/diffing mechanism to write changes from ydiff files into the primary `Budget.yfull` file.
* The syncing mechanism stores changes made during YNAB use and only writes them to `Budget.yfull` when the app is closed.
* How each entity is created and deleted, and how they are linked to other entities.
* An up to date `Budget.yfull` contains everything you need to read and write YNAB entities.
* In order to be able to create a new budget that can interface with YNAB, either the deviceGUID generation algorithm must be known, or the mechanism of syncing `Budget.yfull` files must be discovered.

Those last two points are greatly important as it directs the decision and capabilities of an app that wants to interface with YNAB budget files. In order to create fresh budget files as well as allowing for concurrent use between mobile devices and the desktop app, then the syncing mechanism will need to be looked into.

For me, the mobile client is one of the most fundemental features of YNAB and in order to create a service that can truly act as a replacement for both the desktop and mobile apps then it will be imperative to understand how these two sync together. More on that next time.
