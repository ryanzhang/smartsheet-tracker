AND(
    IFERROR(MONTH(@cell), 0) = MONTH( DATE(YEAR(TODAY()), MONTH(TODAY()), 1) - 1)
    ,IFERROR(YEAR(@cell), 0)
             = YEAR(DATE(YEAR(TODAY()), MONTH(TODAY()), 1) - 1))
