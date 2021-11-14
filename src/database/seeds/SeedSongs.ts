import Songs from "../../models/Song";
import { getConnection } from "typeorm";

export const songsSeed = async () => {

  const songs = [
    {
      "id": 0,
      "user_id": 1,
      "name": "A BARATINHA",
      "description": "Música de domínio público gravada em 2008 pela Galinha Pintadinha através da Bromelia Produções.",
      "singers": "Galinha Pintadinha",
      "thumbnail": "08d5aa37a46a15c6899c-thumbnail.1_thumb_baratinha.png",
      "subtitle": "f4a688778cb4a50b4379-subtitle.1_letra_baratinha.txt",
      "animation": "b9686614f0734a8816b7-animation.A_BARATINHA_VERSAO2",
      "song": "656b934b9463ea5cbfa6-song.1_audio_baratinha.mp3",
      "trainingAnimation1": "a163a525748550a9987c-trainingAnimation1.A_BARATA_DIZ_QUE_TEM",
      "trainingAnimation2": "58b7228ae4143d874c39-trainingAnimation2.HA_HA_HA",
      "trainingAnimation3": "462791370ef53a9da2c9-trainingAnimation3.HO_HO_HO",
      "trainingAnimation4": "eb4128f64ff3f3c2b0e3-trainingAnimation4.E_MENTIRA_DA_BARATA",
      "trainingPhrase1": "A barata diz que tem",
      "trainingPhrase2": "Ha Ha Ha ",
      "trainingPhrase3": "Ho Ho Ho ",
      "trainingPhrase4": "é mentira da barata ",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 0
    },
    {
      "id": 1,
      "user_id": 1,
      "name": "ÍNDIOZINHOS",
      "description": "Galinha Pintadinha",
      "singers": "Música de domínio público gravada em 2018 pela Galinha Pintadinha através da Bromelia Produções.",
      "thumbnail": "0dbd6ae062a0db41eccd-thumbnail.2_thumb_indiozinhos.png",
      "subtitle": "153793660134b0c88f0d-subtitle.2_letra_indiozinhos.txt",
      "animation": "62e1c5a7de60de4a6f36-animation.INDIOS",
      "song": "0fc1e39c3b394f2fda46-song.2_audio_indiozinhos.mp3",
      "trainingAnimation1": "7c8976b8292696ea1600-trainingAnimation1.123_INDIOZINHOS",
      "trainingAnimation2": "6bc6ae6fb102a6dd404d-trainingAnimation2.IAM_NAVEGANDO_RIO_ABAIXO",
      "trainingAnimation3": "d97b5684fb54cb64eb94-trainingAnimation3.QUANDO_O_JACARE_SE_APROXIMOU",
      "trainingAnimation4": "ec410f94f09a16b69490-trainingAnimation4.E_O_INDIOZINHO_OLHOU_PARA_BAIXO",
      "trainingPhrase1": "1 2 3 indiozinhos",
      "trainingPhrase2": "iam navegando rio abaixo",
      "trainingPhrase3": "quando jacaré se aproximou",
      "trainingPhrase4": "e o indiozinho olhou para baixo",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 0
    },
    {
      "id": 2,
      "user_id": 1,
      "name": "Touchscreen",
      "description": "Os Gonzagas é uma banda de forró. O trabalho mais recente do grupo é o disco \"Onde Estará?\".  Touchscreen tem como compositor Zé Neto.",
      "singers": "Os Gonzagas",
      "thumbnail": "7c1f6b8036cd6d198e8b-thumbnail.3_thumb_touchscreen.png",
      "subtitle": "30a71da2bed9f77f7fc1-subtitle.3_letra_touchscreen.txt",
      "animation": "fa4fec919a37e1a8e8bc-animation.OS_GONZAGAS_TOUCHSCREEN",
      "song": "125377e9ef8e9bfe27d0-song.3_audio_touchscreen.mp3",
      "trainingAnimation1": "d86318c39369e6abdab7-trainingAnimation1.DESTRAVA_MINHA_SENHA_DE_ENTRADA",
      "trainingAnimation2": "9e9da6935b55d9189780-trainingAnimation2.NAVEGA_A_MINHA_ALMA_LCD",
      "trainingAnimation3": "0655d6afd6f85e6ed138-trainingAnimation3.VEM_CA_QUE_EU_SOU_TOUCHSCREEN",
      "trainingAnimation4": "874d4abff8500a7f3ec3-trainingAnimation4.FAZ_UM_CARINHO_EM_MIM",
      "trainingPhrase1": "Destrava a minha senha de entrada",
      "trainingPhrase2": "Navega a minha alma LCD",
      "trainingPhrase3": "Vem cá que eu sou touchscreen, ",
      "trainingPhrase4": "faz um carinho em mim ",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 0
    },
    {
      "id": 3,
      "user_id": 1,
      "name": "Alecrim Dourado",
      "description": "Música de domínio público gravada em 2011 pela Galinha Pintadinha através da Bromelia Produções.",
      "singers": "Galinha Pintadinha",
      "thumbnail": "02905bf55b3ce365c630-thumbnail.4_thumb_AlecrimDourado.png",
      "subtitle": "c9471cf7e554e5a2a92a-subtitle.4_letra_AlecrimDourado.txt",
      "animation": "dd6b02f9c5f39b7f7ddf-animation.ALECRIM_DOURADO_VERSAO2",
      "song": "336f1b0d91a9ef4fec3c-song.4_audio_AlecrimDourado.mp3",
      "trainingAnimation1": "a69f70ed3eef20c4226e-trainingAnimation1.ALECRIM_ALECRIM_DOURADO",
      "trainingAnimation2": "37770a1694e1d55aad56-trainingAnimation2.QUE_NASCEU_NO_CAMPO_SEM_SER_SEMEADO",
      "trainingAnimation3": "0f6e661c960b7ca7a399-trainingAnimation3.FOI_MEU_AMOR_QUE_ME_DISSE_ASSIM",
      "trainingAnimation4": "cc4a9e5e3e9712a11a3e-trainingAnimation4.QUE_A_FLOR_DO_CAMPO_E_O_ALECRIM",
      "trainingPhrase1": "Alecrim, alecrim dourado",
      "trainingPhrase2": "que nasceu no campo sem ser semeado",
      "trainingPhrase3": "Foi meu amor que me disse assim",
      "trainingPhrase4": "que a flor do campo é o alecrim",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 120
    },
    {
      "id": 4,
      "user_id": 1,
      "name": "Borboletinha",
      "description": "Música de domínio público gravada em 2009 pela Galinha Pintadinha através da Bromelia Produções.",
      "singers": "Galinha Pintadinha",
      "thumbnail": "20699ea122673f164bbc-thumbnail.5_thumb_borboletinha.png",
      "subtitle": "13e07ad856afb07f8b89-subtitle.5_legenda_borboletinha.txt",
      "animation": "31dc0c91a9c5e61b3fd2-animation.BORBOLETINHA_VERSAO2",
      "song": "a0f22c41e01485930d7c-song.5_audio_borboletinha.mp3",
      "trainingAnimation1": "094fbbec3f8135334f31-trainingAnimation1.BORBOLETINHA",
      "trainingAnimation2": "02db706bf4e64ba2bbbe-trainingAnimation2.TA_NA_COZINHA",
      "trainingAnimation3": "701dec728498321e5ef6-trainingAnimation3.FAZENDO_CHOCOLATE",
      "trainingAnimation4": "a642f4350a8f367d06a8-trainingAnimation4.PARA_A_MADRINHA",
      "trainingPhrase1": "Borboletinha",
      "trainingPhrase2": "tá na cozinha",
      "trainingPhrase3": "Fazendo chocolate",
      "trainingPhrase4": "para a madrinha",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 150
    },
    {
      "id": 5,
      "user_id": 1,
      "name": "Peixe Vivo",
      "description": "Música de domínio público gravada em 2017 pelo Canal Infantil Bob Zoom.",
      "singers": "Bob Zoom",
      "thumbnail": "af97a6496123acb8c35a-thumbnail.6_thumb_peixevivo.png",
      "subtitle": "bf5e13b1cf3144f9c955-subtitle.6_letra_PeixeVivo.txt",
      "animation": "1ab9b2837e2fe597415c-animation.PEIXE_VIVO",
      "song": "1fa99b554fb0f5469887-song.6_audio_PeixeVivo.mp3",
      "trainingAnimation1": "86036110a13179cf0f88-trainingAnimation1.COMO_PODE_UM_PEIXE_VIVO",
      "trainingAnimation2": "ece526081d3587f673cb-trainingAnimation2.VIVER_FORA_DA_AGUA_FRIA",
      "trainingAnimation3": "42583d1604d3ecd4cfe3-trainingAnimation3.COMO_PODE_UM_PEIXE_VIVO",
      "trainingAnimation4": "2978b1f710c07f8423fd-trainingAnimation4.VIVER_FORA_DA_AGUA_FRIA",
      "trainingPhrase1": "Como pode um peixe vivo",
      "trainingPhrase2": "Viver fora da água fria?",
      "trainingPhrase3": "Como pode um peixe vivo",
      "trainingPhrase4": "Viver fora da água fria?",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 200
    },
    {
      "id": 6,
      "user_id": 1,
      "name": "Escravos de Jó",
      "description": "Música de domínio público gravada em 2018 pela Galinha Pintadinha, através da Bromelia Produções.",
      "singers": "Galinha Pintadinha",
      "thumbnail": "eba09f5e3cb4f7380ce9-thumbnail.7_thumb_escravosdejo.png",
      "subtitle": "4c6522fe8817db3a3ba6-subtitle.7_letra_EscravosdeJó.txt",
      "animation": "41d57eb4bf3716e9cadf-animation.ESCRAVOS_DE_JO",
      "song": "7bfec705ad7617d35a27-song.7_audio_EscravosdeJó.mp3",
      "trainingAnimation1": "a582a0788605066413a4-trainingAnimation1.1_ESCRAVOS_DE_JO_REFRAO",
      "trainingAnimation2": "66c2babc66d7fc898ff0-trainingAnimation2.JOGAVAM_CAXANGA",
      "trainingAnimation3": "c8d02217d7cfcaa6ce5b-trainingAnimation3.TIRA_POE",
      "trainingAnimation4": "153b37ccd82d6561ac3b-trainingAnimation4.DEIXA_FICAR",
      "trainingPhrase1": "Escravos de Jó",
      "trainingPhrase2": "Jogavam caxangá",
      "trainingPhrase3": "Tira, põe",
      "trainingPhrase4": "Deixa ficar",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 200
    },
    {
      "id": 7,
      "user_id": 1,
      "name": "Marinheiro Só",
      "description": "Música de domínio público gravada em 2018 pela banda infantil Peti & Poá.",
      "singers": "Peti & Poá",
      "thumbnail": "9d1a94acfe68b8cdad7d-thumbnail.8_thumb_MarinheiroSó.png",
      "subtitle": "50a257d39cc768f54013-subtitle.5_legenda_borboletinha.txt",
      "animation": "8020ceea5881b85c74f8-animation.MARINHEIRO_SO__VERSAO2",
      "song": "843eeb4fdebfa81a8374-song.8_audio_MarinheiroSó.mp3",
      "trainingAnimation1": "9478baa7fa557f7bebcc-trainingAnimation1.MARINHEIRO_SO",
      "trainingAnimation2": "b5340d14b4d5a8085244-trainingAnimation2.QUEM_TE_ENSINOU_A_NADAR",
      "trainingAnimation3": "5a5ab88d9dbbd720ea11-trainingAnimation3.FOI_O_TOMBO_DO_NAVIO",
      "trainingAnimation4": "680e95686f4b6335efed-trainingAnimation4.OU_FOI_O_BALANCO_DO_MAR",
      "trainingPhrase1": "Ô marinheiro, marinheiro",
      "trainingPhrase2": "Quem te ensinou a nadar",
      "trainingPhrase3": "Ou foi o tombo do navio",
      "trainingPhrase4": "Ou foi o balanço do mar",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 230
    },
    {
      "id": 8,
      "user_id": 1,
      "name": "Maria Bonita",
      "description": "Marchinha de carnaval composta por Jorge de Altinho e interpretada por Diassis Martins.",
      "singers": "Diassis Martins",
      "thumbnail": "38c8797d56fe084a6fa0-thumbnail.10_thumb_MariaBonita.png",
      "subtitle": "bc1d0a2f1987bd68757d-subtitle.10_letra_MariaBonita.txt",
      "animation": "d46b8f0c3244907110ec-animation.MARIA_BONITA",
      "song": "755c2d7bba047cd92aa3-song.10_audio_MariaBonita.mp3",
      "trainingAnimation1": "060e215eee376d92b2c7-trainingAnimation1.ACORDA_MARIA_BONITA",
      "trainingAnimation2": "ef0cd74b01630f56e552-trainingAnimation2.LEVANTA_VAI_FAZER_O_CAFE",
      "trainingAnimation3": "7677bd5c188cbf710b02-trainingAnimation3.QUE_O_DIA_JA_VEM_RAIANDO",
      "trainingAnimation4": "92388a53a7c3d98f2e4a-trainingAnimation4.E_A_POLICIA_JA_ESTA_EM_PE",
      "trainingPhrase1": "Acorda, Maria Bonita",
      "trainingPhrase2": "Levanta, vai fazer o café",
      "trainingPhrase3": "Que o dia já vem raiando",
      "trainingPhrase4": "E a polícia já está em pé!",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 350
    },
    {
      "id": 9,
      "user_id": 1,
      "name": "Hino Nacional",
      "description": "A letra foi escrita por Joaquim Osório Duque Estrada e a música elaborada por Francisco Manuel da Silva. O Hino Nacional Brasileiro foi criado em 1831 e é um dos símbolos oficiais da República Federativa do Brasil.",
      "singers": "Pátria Voluntária",
      "thumbnail": "98c080fad0afb458a635-thumbnail.11_thumb_HinoNacional.png",
      "subtitle": "2464f267bbcbb2faa702-subtitle.11_letra_HinoNacional.txt",
      "animation": "4ef090ee0564f5a7dbc3-animation.HINO_NACIONAL",
      "song": "dc38835dda2c7e1bfbe7-song.11_audio_HinoNacional.mp3",
      "trainingAnimation1": "f8b94b6e4c0d54977f6e-trainingAnimation1.OUVIRAM_DO_IPIRANGA_AS_MARGENS_PLACIDAS",
      "trainingAnimation2": "16cb8b0958f891a54bce-trainingAnimation2.DE_UM_POVO_HEROICO_O_BRADO_RETUMBANTE",
      "trainingAnimation3": "6d2c4d3b482436a5dca4-trainingAnimation3.E_O_SOL_DA_LIBERDADE_EM_RAIOS_FUGIDOS",
      "trainingAnimation4": "6333ef56d873e5964892-trainingAnimation4.BRILHOU_NO_CEU_DA_PATRIA_NESSE_INSTANTE",
      "trainingPhrase1": "Ouviram do Ipiranga as margens plácidas",
      "trainingPhrase2": "De um povo heróico o brado retumbante",
      "trainingPhrase3": "E o sol da liberdade, em raios fúlgidos",
      "trainingPhrase4": "Brilhou no céu da pátria nesse instante",
      "created_at": new Date(),
      "updated_at": new Date(),
      "price": 500
    }
  ]

  const songsRepository = getConnection().getRepository(Songs);

  for (const song of songs) {
    await songsRepository.insert(song);
  }

}