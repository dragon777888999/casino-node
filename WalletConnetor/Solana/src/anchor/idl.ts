export type PresaleMultiple = {
  "version": "0.1.0",
  "name": "presale_multiple",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "owner",
          "type": "publicKey"
        },
        {
          "name": "creator",
          "type": "publicKey"
        },
        {
          "name": "percent",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "userContribute",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "refund",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "mintOfToken",
            "type": "publicKey"
          },
          {
            "name": "tokenAmountPerSol",
            "type": "u64"
          },
          {
            "name": "totalTokenAmountToSell",
            "type": "u64"
          },
          {
            "name": "claimedTokenAmount",
            "type": "u64"
          },
          {
            "name": "minBuySolAmount",
            "type": "u64"
          },
          {
            "name": "refundPercentage",
            "type": "u64"
          },
          {
            "name": "totalSolRaised",
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "percent",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributeSolAmount",
            "type": "u64"
          },
          {
            "name": "tokenAmountToClaim",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotOwner",
      "msg": "Only owner can call this function!"
    },
    {
      "code": 6001,
      "name": "NotContributed",
      "msg": "User didn't contribute!"
    },
    {
      "code": 6002,
      "name": "LessThanMinBuyAmount",
      "msg": "Cannot buy less than min amount"
    },
    {
      "code": 6003,
      "name": "NotInitializer",
      "msg": "Only initializer can call this function!"
    },
    {
      "code": 6004,
      "name": "NotCreator",
      "msg": "Only user can call this function!"
    }
  ]
};

export const IDL: PresaleMultiple = {
  "version": "0.1.0",
  "name": "presale_multiple",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "owner",
          "type": "publicKey"
        },
        {
          "name": "creator",
          "type": "publicKey"
        },
        {
          "name": "percent",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawSol",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "userContribute",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "creator",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "refund",
      "accounts": [
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimToken",
      "accounts": [
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintOfTokenBeingSent",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "mintOfToken",
            "type": "publicKey"
          },
          {
            "name": "tokenAmountPerSol",
            "type": "u64"
          },
          {
            "name": "totalTokenAmountToSell",
            "type": "u64"
          },
          {
            "name": "claimedTokenAmount",
            "type": "u64"
          },
          {
            "name": "minBuySolAmount",
            "type": "u64"
          },
          {
            "name": "refundPercentage",
            "type": "u64"
          },
          {
            "name": "totalSolRaised",
            "type": "u64"
          },
          {
            "name": "isInitialized",
            "type": "u8"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "percent",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributeSolAmount",
            "type": "u64"
          },
          {
            "name": "tokenAmountToClaim",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotOwner",
      "msg": "Only owner can call this function!"
    },
    {
      "code": 6001,
      "name": "NotContributed",
      "msg": "User didn't contribute!"
    },
    {
      "code": 6002,
      "name": "LessThanMinBuyAmount",
      "msg": "Cannot buy less than min amount"
    },
    {
      "code": 6003,
      "name": "NotInitializer",
      "msg": "Only initializer can call this function!"
    },
    {
      "code": 6004,
      "name": "NotCreator",
      "msg": "Only user can call this function!"
    }
  ]
};
