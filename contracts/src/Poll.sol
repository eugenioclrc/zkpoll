// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Polls {
    mapping(uint256 formid => bytes32 pkey) public publicKeys;
    uint256 public totalForms;

    struct EncryptedBalanceVal {
        // #TODO : We could pack those in 2 uints instead of 4 to save storage costs (for e.g using circomlibjs library to pack points on BabyJubjub)
        uint256 C1x;
        uint256 C1y;
        uint256 C2x;
        uint256 C2y;
    }

    struct FormData {
        uint256 formid;
        bytes32 pkey;
        uint256 questions;
        mapping(uint256 questionid => EncryptedBalanceVal[2] yesNoValues) questionsData;
    }

    struct Question {
        uint256 questionid;
        string questionText;
    }

    mapping(uint256 formid => FormData form) public forms;

    event FormCreated(uint256 formid, bytes32 pkey, Question[] questions);

    function createForm(bytes32 pkey, Question[] memory questions, EncryptedBalanceVal memory yesVal, EncryptedBalanceVal memory noVal) public {
        uint256 formid = totalForms++;
        publicKeys[formid] = pkey;
        FormData storage form = forms[formid];
        form.formid = formid;
        form.pkey = pkey;
        form.questions = questions.length;
        for (uint256 i = 0; i < questions.length; i++) {
            form.questionsData[i][0].C1x = yesVal.C1x;
            form.questionsData[i][0].C1y = yesVal.C1y;
            form.questionsData[i][0].C2x = yesVal.C2x;
            form.questionsData[i][0].C2y = yesVal.C2y;
            form.questionsData[i][1].C1x = noVal.C1x;
            form.questionsData[i][1].C1y = noVal.C1y;
            form.questionsData[i][1].C2x = noVal.C2x;
            form.questionsData[i][1].C2y = noVal.C2y;
        }

        emit FormCreated(formid, pkey, questions);
    }

    // use poseidon to avoid double voting
    function vote(uint256 formid, EncryptedBalanceVal[][] memory votes) public {
        // votes is encripted with elgamal
        require(forms[formid].questions == votes.length, "Invalid number of votes");
        for (uint256 i = 0; i < votes.length; i++) {
            require(votes[i].length == 2, "Invalid vote");
            forms[formid].questionsData[i][0].C1x += votes[i][0].C1x;
            forms[formid].questionsData[i][0].C1y += votes[i][0].C1y;
            forms[formid].questionsData[i][0].C2x += votes[i][0].C2x;
            forms[formid].questionsData[i][0].C2y += votes[i][0].C2y;
            forms[formid].questionsData[i][1].C1x += votes[i][1].C1x;
            forms[formid].questionsData[i][1].C1y += votes[i][1].C1y;
            forms[formid].questionsData[i][1].C2x += votes[i][1].C2x;
            forms[formid].questionsData[i][1].C2y += votes[i][1].C2y;
        }

    }
}
