const cheerio = require("cheerio");
const app = require("express")();
const cors = require("cors");
const port = process.env.PORT || 3000;

const _map = [
  // gold & silver
  [
    "https://egcurrency.com/en/country/egypt",
    [
      // gold
      ["usd_gold", 'a[href="/en/currency/usd-to-egp/gold"]>b'],
      ["goldO_usd", 'a[href="/en/gold/gold-ounce-in-usd"]>b'],
      ["goldO_euro", 'a[href="/en/gold/gold-ounce-in-eur"]>b'],
      [
        "goldO_egp_b",
        'tr[data-href="/en/gold/gold-ounce-in-egp"]>td:nth-child(2)',
      ],
      [
        "goldO_egp_s",
        'tr[data-href="/en/gold/gold-ounce-in-egp"]>td:nth-child(3)',
      ],
      [
        "goldP_egp_b",
        'tr[data-href="/en/gold/gold-coin-in-egp"]>td:nth-child(2)',
      ],
      [
        "goldP_egp_s",
        'tr[data-href="/en/gold/gold-coin-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold24_egp_b",
        'tr[data-href="/en/gold/24-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold24_egp_s",
        'tr[data-href="/en/gold/24-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold22_egp_b",
        'tr[data-href="/en/gold/22-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold22_egp_s",
        'tr[data-href="/en/gold/22-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold21_egp_b",
        'tr[data-href="/en/gold/21-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold21_egp_s",
        'tr[data-href="/en/gold/21-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold18_egp_b",
        'tr[data-href="/en/gold/18-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold18_egp_s",
        'tr[data-href="/en/gold/18-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold14_egp_b",
        'tr[data-href="/en/gold/14-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold14_egp_s",
        'tr[data-href="/en/gold/14-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold12_egp_b",
        'tr[data-href="/en/gold/12-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold12_egp_s",
        'tr[data-href="/en/gold/12-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold9_egp_b",
        'tr[data-href="/en/gold/9-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold9_egp_s",
        'tr[data-href="/en/gold/9-karat-in-egp"]>td:nth-child(3)',
      ],
      // silver
      [
        "sil999_egp_b",
        'tr[data-href="/en/silver/silver-999-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil999_egp_s",
        'tr[data-href="/en/silver/silver-999-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil960_egp_b",
        'tr[data-href="/en/silver/silver-960-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil960_egp_s",
        'tr[data-href="/en/silver/silver-960-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil958_egp_b",
        'tr[data-href="/en/silver/silver-958-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil958_egp_s",
        'tr[data-href="/en/silver/silver-958-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil950_egp_b",
        'tr[data-href="/en/silver/silver-950-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil950_egp_s",
        'tr[data-href="/en/silver/silver-950-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil947_egp_b",
        'tr[data-href="/en/silver/silver-947-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil947_egp_s",
        'tr[data-href="/en/silver/silver-947-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil925_egp_b",
        'tr[data-href="/en/silver/silver-925-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil925_egp_s",
        'tr[data-href="/en/silver/silver-925-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil800_egp_b",
        'tr[data-href="/en/silver/silver-800-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil800_egp_s",
        'tr[data-href="/en/silver/silver-800-in-egp"]>td:nth-child(3)',
      ],
      [
        "silOZ_egp_b",
        'tr[data-href="/en/silver/silver-ounce-in-egp"]>td:nth-child(2)',
      ],
      [
        "silOZ_egp_s",
        'tr[data-href="/en/silver/silver-ounce-in-egp"]>td:nth-child(3)',
      ],
    ],
  ],
  // bank
  [
    "https://egcurrency.com/en/currency/egp/cbe",
    [
      ["usd_egp_b", 'tr[data-href="/en/currency/usd-to-egp"]>td:nth-child(2)'],
      ["usd_egp_s", 'tr[data-href="/en/currency/usd-to-egp"]>td:nth-child(3)'],
      ["sar_egp_b", 'tr[data-href="/en/currency/sar-to-egp"]>td:nth-child(2)'],
      ["sar_egp_s", 'tr[data-href="/en/currency/sar-to-egp"]>td:nth-child(3)'],
      ["eur_egp_b", 'tr[data-href="/en/currency/eur-to-egp"]>td:nth-child(2)'],
      ["eur_egp_s", 'tr[data-href="/en/currency/eur-to-egp"]>td:nth-child(3)'],
      ["aed_egp_b", 'tr[data-href="/en/currency/aed-to-egp"]>td:nth-child(2)'],
      ["aed_egp_s", 'tr[data-href="/en/currency/aed-to-egp"]>td:nth-child(3)'],
      ["kwd_egp_b", 'tr[data-href="/en/currency/kwd-to-egp"]>td:nth-child(2)'],
      ["kwd_egp_s", 'tr[data-href="/en/currency/kwd-to-egp"]>td:nth-child(3)'],
      ["gbp_egp_b", 'tr[data-href="/en/currency/gbp-to-egp"]>td:nth-child(2)'],
      ["gbp_egp_s", 'tr[data-href="/en/currency/gbp-to-egp"]>td:nth-child(3)'],
      ["omr_egp_b", 'tr[data-href="/en/currency/omr-to-egp"]>td:nth-child(2)'],
      ["omr_egp_s", 'tr[data-href="/en/currency/omr-to-egp"]>td:nth-child(3)'],
      ["qar_egp_b", 'tr[data-href="/en/currency/qar-to-egp"]>td:nth-child(2)'],
      ["qar_egp_s", 'tr[data-href="/en/currency/qar-to-egp"]>td:nth-child(3)'],
      ["cny_egp_b", 'tr[data-href="/en/currency/cny-to-egp"]>td:nth-child(2)'],
      ["cny_egp_s", 'tr[data-href="/en/currency/cny-to-egp"]>td:nth-child(3)'],
      ["bhd_egp_b", 'tr[data-href="/en/currency/bhd-to-egp"]>td:nth-child(2)'],
      ["bhd_egp_s", 'tr[data-href="/en/currency/bhd-to-egp"]>td:nth-child(3)'],
      ["jod_egp_b", 'tr[data-href="/en/currency/jod-to-egp"]>td:nth-child(2)'],
      ["jod_egp_s", 'tr[data-href="/en/currency/jod-to-egp"]>td:nth-child(3)'],
      ["cad_egp_b", 'tr[data-href="/en/currency/cad-to-egp"]>td:nth-child(2)'],
      ["cad_egp_s", 'tr[data-href="/en/currency/cad-to-egp"]>td:nth-child(3)'],
      ["aud_egp_b", 'tr[data-href="/en/currency/aud-to-egp"]>td:nth-child(2)'],
      ["aud_egp_s", 'tr[data-href="/en/currency/aud-to-egp"]>td:nth-child(3)'],
      ["jpy_egp_b", 'tr[data-href="/en/currency/jpy-to-egp"]>td:nth-child(2)'],
      ["jpy_egp_s", 'tr[data-href="/en/currency/jpy-to-egp"]>td:nth-child(3)'],
      ["sek_egp_b", 'tr[data-href="/en/currency/sek-to-egp"]>td:nth-child(2)'],
      ["sek_egp_s", 'tr[data-href="/en/currency/sek-to-egp"]>td:nth-child(3)'],
      ["chf_egp_b", 'tr[data-href="/en/currency/chf-to-egp"]>td:nth-child(2)'],
      ["chf_egp_s", 'tr[data-href="/en/currency/chf-to-egp"]>td:nth-child(3)'],
      ["nok_egp_b", 'tr[data-href="/en/currency/nok-to-egp"]>td:nth-child(2)'],
      ["nok_egp_s", 'tr[data-href="/en/currency/nok-to-egp"]>td:nth-child(3)'],
      ["dkk_egp_b", 'tr[data-href="/en/currency/dkk-to-egp"]>td:nth-child(2)'],
      ["dkk_egp_s", 'tr[data-href="/en/currency/dkk-to-egp"]>td:nth-child(3)'],
    ],
  ],
  // black market
  [
    "https://egcurrency.com/en/currency/egp/exchange",
    [
      [
        "usd_egp_bm_b",
        'tr[data-href="/en/currency/usd-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "usd_egp_bm_s",
        'tr[data-href="/en/currency/usd-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "sar_egp_bm_b",
        'tr[data-href="/en/currency/sar-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "sar_egp_bm_s",
        'tr[data-href="/en/currency/sar-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "eur_egp_bm_b",
        'tr[data-href="/en/currency/eur-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "eur_egp_bm_s",
        'tr[data-href="/en/currency/eur-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "aed_egp_bm_b",
        'tr[data-href="/en/currency/aed-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "aed_egp_bm_s",
        'tr[data-href="/en/currency/aed-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "kwd_egp_bm_b",
        'tr[data-href="/en/currency/kwd-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "kwd_egp_bm_s",
        'tr[data-href="/en/currency/kwd-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "gbp_egp_bm_b",
        'tr[data-href="/en/currency/gbp-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "gbp_egp_bm_s",
        'tr[data-href="/en/currency/gbp-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "omr_egp_bm_b",
        'tr[data-href="/en/currency/omr-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "omr_egp_bm_s",
        'tr[data-href="/en/currency/omr-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "qar_egp_bm_b",
        'tr[data-href="/en/currency/qar-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "qar_egp_bm_s",
        'tr[data-href="/en/currency/qar-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "cny_egp_bm_b",
        'tr[data-href="/en/currency/cny-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "cny_egp_bm_s",
        'tr[data-href="/en/currency/cny-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "bhd_egp_bm_b",
        'tr[data-href="/en/currency/bhd-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "bhd_egp_bm_s",
        'tr[data-href="/en/currency/bhd-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "jod_egp_bm_b",
        'tr[data-href="/en/currency/jod-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "jod_egp_bm_s",
        'tr[data-href="/en/currency/jod-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "cad_egp_bm_b",
        'tr[data-href="/en/currency/cad-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "cad_egp_bm_s",
        'tr[data-href="/en/currency/cad-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "aud_egp_bm_b",
        'tr[data-href="/en/currency/aud-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "aud_egp_bm_s",
        'tr[data-href="/en/currency/aud-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "jpy_egp_bm_b",
        'tr[data-href="/en/currency/jpy-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "jpy_egp_bm_s",
        'tr[data-href="/en/currency/jpy-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "sek_egp_bm_b",
        'tr[data-href="/en/currency/sek-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "sek_egp_bm_s",
        'tr[data-href="/en/currency/sek-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "chf_egp_bm_b",
        'tr[data-href="/en/currency/chf-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "chf_egp_bm_s",
        'tr[data-href="/en/currency/chf-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "nok_egp_bm_b",
        'tr[data-href="/en/currency/nok-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "nok_egp_bm_s",
        'tr[data-href="/en/currency/nok-to-egp/exchange"]>td:nth-child(3)',
      ],
      [
        "dkk_egp_bm_b",
        'tr[data-href="/en/currency/dkk-to-egp/exchange"]>td:nth-child(2)',
      ],
      [
        "dkk_egp_bm_s",
        'tr[data-href="/en/currency/dkk-to-egp/exchange"]>td:nth-child(3)',
      ],
    ],
  ],
  // gasoline
  [
    "https://banklive.net/en/petroleum-price",
    [
      [
        "gasoline80",
        "#petroleum-price-today > tbody > tr:nth-child(1) > td:nth-child(2)",
      ],
      [
        "gasoline92",
        "#petroleum-price-today > tbody > tr:nth-child(2) > td:nth-child(2)",
      ],
      [
        "gasoline95",
        "#petroleum-price-today > tbody > tr:nth-child(3) > td:nth-child(2)",
      ],
      [
        "kerosene",
        "#petroleum-price-today > tbody > tr:nth-child(4) > td:nth-child(2)",
      ],
      [
        "solar",
        "#petroleum-price-today > tbody > tr:nth-child(5) > td:nth-child(2)",
      ],
      [
        "gas_cyl",
        "#petroleum-price-today > tbody > tr:nth-child(6) > td:nth-child(2)",
      ],
    ],
  ],
];

// url => [ [porperty, selection], .....]
const map = [
  // gold & silver
  [
    "https://egcurrency.com/en/country/egypt",
    [
      // gold
      ["usd_gold", 'a[href="/en/currency/usd-to-egp/gold"]>b'],
      ["goldO_usd", 'a[href="/en/gold/gold-ounce-in-usd"]>b'],
      ["goldO_euro", 'a[href="/en/gold/gold-ounce-in-eur"]>b'],
      [
        "goldO_egp_b",
        'tr[data-href="/en/gold/gold-ounce-in-egp"]>td:nth-child(2)',
      ],
      [
        "goldO_egp_s",
        'tr[data-href="/en/gold/gold-ounce-in-egp"]>td:nth-child(3)',
      ],
      [
        "goldP_egp_b",
        'tr[data-href="/en/gold/gold-coin-in-egp"]>td:nth-child(2)',
      ],
      [
        "goldP_egp_s",
        'tr[data-href="/en/gold/gold-coin-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold24_egp_b",
        'tr[data-href="/en/gold/24-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold24_egp_s",
        'tr[data-href="/en/gold/24-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold22_egp_b",
        'tr[data-href="/en/gold/22-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold22_egp_s",
        'tr[data-href="/en/gold/22-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold21_egp_b",
        'tr[data-href="/en/gold/21-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold21_egp_s",
        'tr[data-href="/en/gold/21-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold18_egp_b",
        'tr[data-href="/en/gold/18-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold18_egp_s",
        'tr[data-href="/en/gold/18-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold14_egp_b",
        'tr[data-href="/en/gold/14-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold14_egp_s",
        'tr[data-href="/en/gold/14-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold12_egp_b",
        'tr[data-href="/en/gold/12-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold12_egp_s",
        'tr[data-href="/en/gold/12-karat-in-egp"]>td:nth-child(3)',
      ],
      [
        "gold9_egp_b",
        'tr[data-href="/en/gold/9-karat-in-egp"]>td:nth-child(2)',
      ],
      [
        "gold9_egp_s",
        'tr[data-href="/en/gold/9-karat-in-egp"]>td:nth-child(3)',
      ],
      // silver
      [
        "sil999_egp_b",
        'tr[data-href="/en/silver/silver-999-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil999_egp_s",
        'tr[data-href="/en/silver/silver-999-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil960_egp_b",
        'tr[data-href="/en/silver/silver-960-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil960_egp_s",
        'tr[data-href="/en/silver/silver-960-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil958_egp_b",
        'tr[data-href="/en/silver/silver-958-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil958_egp_s",
        'tr[data-href="/en/silver/silver-958-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil950_egp_b",
        'tr[data-href="/en/silver/silver-950-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil950_egp_s",
        'tr[data-href="/en/silver/silver-950-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil947_egp_b",
        'tr[data-href="/en/silver/silver-947-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil947_egp_s",
        'tr[data-href="/en/silver/silver-947-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil925_egp_b",
        'tr[data-href="/en/silver/silver-925-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil925_egp_s",
        'tr[data-href="/en/silver/silver-925-in-egp"]>td:nth-child(3)',
      ],
      [
        "sil800_egp_b",
        'tr[data-href="/en/silver/silver-800-in-egp"]>td:nth-child(2)',
      ],
      [
        "sil800_egp_s",
        'tr[data-href="/en/silver/silver-800-in-egp"]>td:nth-child(3)',
      ],
      [
        "silOZ_egp_b",
        'tr[data-href="/en/silver/silver-ounce-in-egp"]>td:nth-child(2)',
      ],
      [
        "silOZ_egp_s",
        'tr[data-href="/en/silver/silver-ounce-in-egp"]>td:nth-child(3)',
      ],
    ],
  ],
  // bank
  [
    "https://egcurrency.com/en/currency/egp/cbe",
    [
      ["usd_egp_b", 'tr[data-href="/en/currency/usd-to-egp"]>td:nth-child(3)'],
      ["usd_egp_s", 'tr[data-href="/en/currency/usd-to-egp"]>td:nth-child(2)'],
      ["eur_egp_b", 'tr[data-href="/en/currency/eur-to-egp"]>td:nth-child(3)'],
      ["eur_egp_s", 'tr[data-href="/en/currency/eur-to-egp"]>td:nth-child(2)'],
      ["sar_egp_b", 'tr[data-href="/en/currency/sar-to-egp"]>td:nth-child(3)'],
      ["sar_egp_s", 'tr[data-href="/en/currency/sar-to-egp"]>td:nth-child(2)'],
      ["aed_egp_b", 'tr[data-href="/en/currency/aed-to-egp"]>td:nth-child(3)'],
      ["aed_egp_s", 'tr[data-href="/en/currency/aed-to-egp"]>td:nth-child(2)'],
      ["qar_egp_b", 'tr[data-href="/en/currency/qar-to-egp"]>td:nth-child(3)'],
      ["qar_egp_s", 'tr[data-href="/en/currency/qar-to-egp"]>td:nth-child(2)'],
      ["kwd_egp_b", 'tr[data-href="/en/currency/kwd-to-egp"]>td:nth-child(3)'],
      ["kwd_egp_s", 'tr[data-href="/en/currency/kwd-to-egp"]>td:nth-child(2)'],
      ["jod_egp_b", 'tr[data-href="/en/currency/jod-to-egp"]>td:nth-child(3)'],
      ["jod_egp_s", 'tr[data-href="/en/currency/jod-to-egp"]>td:nth-child(2)'],
      ["omr_egp_b", 'tr[data-href="/en/currency/omr-to-egp"]>td:nth-child(3)'],
      ["omr_egp_s", 'tr[data-href="/en/currency/omr-to-egp"]>td:nth-child(2)'],
      ["bhd_egp_b", 'tr[data-href="/en/currency/bhd-to-egp"]>td:nth-child(3)'],
      ["bhd_egp_s", 'tr[data-href="/en/currency/bhd-to-egp"]>td:nth-child(2)'],
      ["cny_egp_b", 'tr[data-href="/en/currency/cny-to-egp"]>td:nth-child(3)'],
      ["cny_egp_s", 'tr[data-href="/en/currency/cny-to-egp"]>td:nth-child(2)'],
      ["cad_egp_b", 'tr[data-href="/en/currency/cad-to-egp"]>td:nth-child(3)'],
      ["cad_egp_s", 'tr[data-href="/en/currency/cad-to-egp"]>td:nth-child(2)'],
      ["gbp_egp_b", 'tr[data-href="/en/currency/gbp-to-egp"]>td:nth-child(3)'],
      ["gbp_egp_s", 'tr[data-href="/en/currency/gbp-to-egp"]>td:nth-child(2)'],
      ["aud_egp_b", 'tr[data-href="/en/currency/aud-to-egp"]>td:nth-child(3)'],
      ["aud_egp_s", 'tr[data-href="/en/currency/aud-to-egp"]>td:nth-child(2)'],
      ["jpy_egp_b", 'tr[data-href="/en/currency/jpy-to-egp"]>td:nth-child(2)'],
      ["jpy_egp_s", 'tr[data-href="/en/currency/jpy-to-egp"]>td:nth-child(3)'],
      ["sek_egp_b", 'tr[data-href="/en/currency/sek-to-egp"]>td:nth-child(2)'],
      ["sek_egp_s", 'tr[data-href="/en/currency/sek-to-egp"]>td:nth-child(3)'],
      ["chf_egp_b", 'tr[data-href="/en/currency/chf-to-egp"]>td:nth-child(2)'],
      ["chf_egp_s", 'tr[data-href="/en/currency/chf-to-egp"]>td:nth-child(3)'],
      ["nok_egp_b", 'tr[data-href="/en/currency/nok-to-egp"]>td:nth-child(2)'],
      ["nok_egp_s", 'tr[data-href="/en/currency/nok-to-egp"]>td:nth-child(3)'],
      ["dkk_egp_b", 'tr[data-href="/en/currency/dkk-to-egp"]>td:nth-child(2)'],
      ["dkk_egp_s", 'tr[data-href="/en/currency/dkk-to-egp"]>td:nth-child(3)'],
    ],
  ],
  // black market
  [
    "https://souq-today.com/ar/currencies",
    [
      [
        "usd_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/usd"]',
      ],
      [
        "usd_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/usd"]',
      ],
      [
        "eur_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/eur"]',
      ],
      [
        "eur_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/eur"]',
      ],
      [
        "sar_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/sar"]',
      ],
      [
        "sar_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/sar"]',
      ],
      [
        "aed_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/aed"]',
      ],
      [
        "aed_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/aed"]',
      ],
      [
        "qar_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/qar"]',
      ],
      [
        "qar_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/qar"]',
      ],
      [
        "kwd_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/kwd"]',
      ],
      [
        "kwd_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/kwd"]',
      ],
      [
        "jod_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/jod"]',
      ],
      [
        "jod_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/jod"]',
      ],
      [
        "omr_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/omr"]',
      ],
      [
        "omr_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/omr"]',
      ],
      [
        "bhd_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/bhd"]',
      ],
      [
        "bhd_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/bhd"]',
      ],
      [
        "cny_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/cny"]',
      ],
      [
        "cny_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/cny"]',
      ],
      [
        "cad_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/cad"]',
      ],
      [
        "cad_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/cad"]',
      ],
      [
        "gbp_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/gbp"]',
      ],
      [
        "gbp_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/gbp"]',
      ],
      [
        "aud_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/aud"]',
      ],
      [
        "aud_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/aud"]',
      ],
      [
        "lyd_egp_bm_b",
        'td:nth-child(2)>a[href="https://souq-today.com/ar/currency/lyd"]',
      ],
      [
        "lyd_egp_bm_s",
        'td:nth-child(3)>a[href="https://souq-today.com/ar/currency/lyd"]',
      ],
    ],
  ],
  // gasoline
  [
    "https://banklive.net/en/petroleum-price",
    [
      [
        "gasoline80",
        "#petroleum-price-today > tbody > tr:nth-child(1) > td:nth-child(2)",
      ],
      [
        "gasoline92",
        "#petroleum-price-today > tbody > tr:nth-child(2) > td:nth-child(2)",
      ],
      [
        "gasoline95",
        "#petroleum-price-today > tbody > tr:nth-child(3) > td:nth-child(2)",
      ],
      [
        "kerosene",
        "#petroleum-price-today > tbody > tr:nth-child(4) > td:nth-child(2)",
      ],
      [
        "solar",
        "#petroleum-price-today > tbody > tr:nth-child(5) > td:nth-child(2)",
      ],
      [
        "gas_cyl",
        "#petroleum-price-today > tbody > tr:nth-child(6) > td:nth-child(2)",
      ],
    ],
  ],
  // USD-EGPp investing
  [
    "https://www.investing.com/currencies/usd-egpp",
    [["usd_egpp", 'div[data-test="instrument-price-last"]']],
  ],
  // usdt
  [
    "https://www.google.com/finance/quote/USDT-EGP",
    [["usdt_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // usd-egp
  [
    "https://www.google.com/finance/quote/USD-EGP",
    [["usd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],

  // eur-egp
  [
    "https://www.google.com/finance/quote/EUR-EGP",
    [["eur_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // gbp-egp
  [
    "https://www.google.com/finance/quote/GBP-EGP",
    [["gbp_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // sar-egp
  [
    "https://www.google.com/finance/quote/SAR-EGP",
    [["gbp_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // aed-egp
  [
    "https://www.google.com/finance/quote/AED-EGP",
    [["aed_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // kwd-egp
  [
    "https://www.google.com/finance/quote/KWD-EGP",
    [["kwd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // omr-egp
  [
    "https://www.google.com/finance/quote/OMR-EGP",
    [["omr_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // cny-egp
  [
    "https://www.google.com/finance/quote/CNY-EGP",
    [["cny_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // qar-egp
  [
    "https://www.google.com/finance/quote/QAR-EGP",
    [["qar_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // bhd-egp
  [
    "https://www.google.com/finance/quote/BHD-EGP",
    [["bhd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // jod-egp
  [
    "https://www.google.com/finance/quote/JOD-EGP",
    [["jod_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // cad-egp
  [
    "https://www.google.com/finance/quote/CAD-EGP",
    [["cad_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // aud-egp
  [
    "https://www.google.com/finance/quote/AUD-EGP",
    [["aud_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // jpy-egp
  [
    "https://www.google.com/finance/quote/JPY-EGP",
    [["jpy_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // chf-egp
  [
    "https://www.google.com/finance/quote/CHF-EGP",
    [["chf_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // sek-egp
  [
    "https://www.google.com/finance/quote/SEK-EGP",
    [["sek_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // nok-egp
  [
    "https://www.google.com/finance/quote/NOK-EGP",
    [["nok_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // dkk-egp
  [
    "https://www.google.com/finance/quote/DKK-EGP",
    [["dkk_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // try-egp
  [
    "https://www.google.com/finance/quote/TRY-EGP",
    [["try_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // lyd-egp
  [
    "https://www.google.com/finance/quote/LYD-EGP",
    [["lyd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // dzd-egp
  [
    "https://www.google.com/finance/quote/DZD-EGP",
    [["dzd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // mad-egp
  [
    "https://www.google.com/finance/quote/MAD-EGP",
    [["mad_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // tnd-egp
  [
    "https://www.google.com/finance/quote/TND-EGP",
    [["tnd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // rub-egp
  [
    "https://www.google.com/finance/quote/RUB-EGP",
    [["rub_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // brl-egp
  [
    "https://www.google.com/finance/quote/BRL-EGP",
    [["brl_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // iqd-egp
  [
    "https://www.google.com/finance/quote/IQD-EGP",
    [["iqd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // zar-egp
  [
    "https://www.google.com/finance/quote/ZAR-EGP",
    [["zar_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
];

// get data
const get_html = async (url) => {
  const res = await fetch(url);
  return res.ok ? await res.text() : null;
};

const get_prices = async () => {
  const prices = {};

  try {
    for (const [url, prop_sel] of map) {
      const html = await get_html(url);

      if (html) {
        const $ = cheerio.load(html);

        for (const [prop, sel] of prop_sel) {
          prices[prop] = Number.parseFloat($(sel).text().replace(",", ""));
        }
      }
    }
    console.error("SUCCESS ✅");
  } catch (e) {
    console.error("ERROR ❌: ", e.message);
    return null;
  }
  return prices;
};

const handler = async (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  const response = await get_prices();
  const code = response ? 200 : 404;
  res.status(code).json(response);
};

app.use(cors());
app.get("/", handler);
app.get("/prices", handler);
app.get("/prices", handler);

app.listen(port, () => {
  console.log("Listening on port: " + port);
});

/*

// eur-egp
  [
    "https://www.google.com/finance/quote/EUR-EGP",
    [["eur_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // gbp-egp
  [
    "https://www.google.com/finance/quote/GBP-EGP",
    [["gbp_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // sar-egp
  [
    "https://www.google.com/finance/quote/SAR-EGP",
    [["gbp_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // aed-egp
  [
    "https://www.google.com/finance/quote/AED-EGP",
    [["aed_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // kwd-egp
  [
    "https://www.google.com/finance/quote/KWD-EGP",
    [["kwd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // omr-egp
  [
    "https://www.google.com/finance/quote/OMR-EGP",
    [["omr_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // cny-egp
  [
    "https://www.google.com/finance/quote/CNY-EGP",
    [["cny_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // qar-egp
  [
    "https://www.google.com/finance/quote/QAR-EGP",
    [["qar_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // bhd-egp
  [
    "https://www.google.com/finance/quote/BHD-EGP",
    [["bhd_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // jod-egp
  [
    "https://www.google.com/finance/quote/JOD-EGP",
    [["jod_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // cad-egp
  [
    "https://www.google.com/finance/quote/CAD-EGP",
    [["cad_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // aud-egp
  [
    "https://www.google.com/finance/quote/AUD-EGP",
    [["aud_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // jpy-egp
  [
    "https://www.google.com/finance/quote/JPY-EGP",
    [["jpy_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // chf-egp
  [
    "https://www.google.com/finance/quote/CHF-EGP",
    [["chf_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // sek-egp
  [
    "https://www.google.com/finance/quote/SEK-EGP",
    [["sek_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // nok-egp
  [
    "https://www.google.com/finance/quote/NOK-EGP",
    [["nok_egp", 'div[class="YMlKec fxKbKc"]']],
  ],
  // dkk-egp
  [
    "https://www.google.com/finance/quote/DKK-EGP",
    [["dkk_egp", 'div[class="YMlKec fxKbKc"]']],
  ],

*/
