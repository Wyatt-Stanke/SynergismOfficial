import Decimal from 'break_infinity.js'
import i18next from 'i18next'
import { achievementaward, totalachievementpoints } from './Achievements'
import { DOMCacheGetOrSet } from './Cache/DOM'
import {
  CalcCorruptionStuff,
  calculateAscensionSpeedMult,
  calculateGlobalSpeedMult,
  isIARuneUnlocked,
  isShopTalismanUnlocked
} from './Calculate'
import { getMaxChallenges } from './Challenges'
import { revealCorruptions } from './Corruptions'
import { initializeCart } from './purchases/CartTab'
import { autoResearchEnabled } from './Research'
import { displayRuneInformation } from './Runes'
import { updateSingularityPenalties, updateSingularityPerks } from './singularity'
import { format, formatTimeShort, /*formatTimeShort*/ player } from './Synergism'
import { getActiveSubTab, Tabs } from './Tabs'
import type { OneToFive, ZeroToFour, ZeroToSeven } from './types/Synergism'
import {
  visualUpdateAchievements,
  visualUpdateAnts,
  visualUpdateBuildings,
  visualUpdateCampaign,
  visualUpdateChallenges,
  visualUpdateCorruptions,
  visualUpdateCubes,
  visualUpdateEvent,
  visualUpdatePurchase,
  visualUpdateResearch,
  visualUpdateRunes,
  visualUpdateSettings,
  visualUpdateShop,
  visualUpdateSingularity,
  visualUpdateUpgrades
} from './UpdateVisuals'
import { createDeferredPromise } from './Utility'
import { Globals as G } from './Variables'

export const revealStuff = () => {
  document.documentElement.dataset.coinOne = player.unlocks.coinone ? 'true' : 'false'
  document.documentElement.dataset.coinTwo = player.unlocks.cointwo ? 'true' : 'false'
  document.documentElement.dataset.coinThree = player.unlocks.cointhree ? 'true' : 'false'
  document.documentElement.dataset.coinFour = player.unlocks.coinfour ? 'true' : 'false'

  const example5 = document.getElementsByClassName('prestigeunlock') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example5.length; i++) {
    const parent = example5[i].parentElement
    if (parent?.classList.contains('offlineStats')) {
      example5[i].style.display = player.unlocks.prestige ? 'flex' : 'none'
      example5[i].setAttribute('aria-disabled', `${!player.unlocks.prestige}`)
    } else {
      example5[i].style.display = player.unlocks.prestige ? 'block' : 'none'
      example5[i].setAttribute('aria-disabled', `${!player.unlocks.prestige}`)
    }
  }

  document.documentElement.dataset.generationUnlock = player.unlocks.generation ? 'true' : 'false'

  const example7 = document.getElementsByClassName('transcendunlock') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example7.length; i++) {
    const parent = example7[i].parentElement!
    if (parent.classList.contains('offlineStats')) {
      example7[i].style.display = player.unlocks.transcend ? 'flex' : 'none'
      example7[i].setAttribute('aria-disabled', `${!player.unlocks.transcend}`)
    } else {
      example7[i].style.display = player.unlocks.transcend ? 'block' : 'none'
      example7[i].setAttribute('aria-disabled', `${!player.unlocks.transcend}`)
    }
  }

  const example8 = document.getElementsByClassName('reincarnationunlock') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example8.length; i++) {
    const parent = example8[i].parentElement!
    if (parent.classList.contains('offlineStats')) {
      example8[i].style.display = player.unlocks.reincarnate ? 'flex' : 'none'
      example8[i].setAttribute('aria-disabled', `${!player.unlocks.reincarnate}`)
    } else {
      example8[i].style.display = player.unlocks.reincarnate ? 'block' : 'none'
      example8[i].setAttribute('aria-disabled', `${!player.unlocks.reincarnate}`)
    }
  }

  const example9 = document.getElementsByClassName('auto') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example9.length; i++) {
    example9[i].style.display = 'none'
    example9[i].setAttribute('aria-disabled', 'true')
  }

  document.documentElement.dataset.reincarnationOne = player.researches[47] === 1 ? 'true' : 'false'
  document.documentElement.dataset.reincarnationTwo = player.researches[48] === 1 ? 'true' : 'false'
  document.documentElement.dataset.reincarnationThree = player.researches[49] === 1 ? 'true' : 'false'
  document.documentElement.dataset.reincarnationFour = player.researches[50] === 1 ? 'true' : 'false'

  document.documentElement.dataset.chal6 = player.achievements[113] === 1 ? 'true' : 'false'
  document.documentElement.dataset.chal7 = player.achievements[120] === 1 ? 'true' : 'false'
  document.documentElement.dataset.chal7x10 = player.achievements[124] === 1 ? 'true' : 'false'

  const example17 = document.getElementsByClassName('chal8') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example17.length; i++) {
    const parent = example17[i].parentElement!
    if (parent.classList.contains('offlineStats')) {
      example17[i].style.display = player.achievements[127] === 1 ? 'flex' : 'none'
      example17[i].setAttribute('aria-disabled', `${player.achievements[127] !== 1}`)
    } else {
      example17[i].style.display = player.achievements[127] === 1 ? 'block' : 'none'
      example17[i].setAttribute('aria-disabled', `${player.achievements[127] !== 1}`)
    }
  }

  document.documentElement.dataset.chal9 = player.achievements[134] === 1 ? 'true' : 'false'
  document.documentElement.dataset.chal9x1 = player.highestchallengecompletions[9] > 0 ? 'true' : 'false'
  document.documentElement.dataset.chal10 = player.achievements[141] === 1 ? 'true' : 'false'

  const example21 = document.getElementsByClassName('ascendunlock') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < example21.length; i++) {
    const parent = example21[i].parentElement!
    if (parent.classList.contains('offlineStats')) {
      example21[i].style.display = player.ascensionCount > 0 ? 'flex' : 'none'
      example21[i].setAttribute('aria-disabled', `${player.ascensionCount <= 0}`)
    } else {
      example21[i].style.display = player.ascensionCount > 0 ? 'block' : 'none'
      example21[i].setAttribute('aria-disabled', `${player.ascensionCount <= 0}`)
    }
  }

  document.documentElement.dataset.chal11 = player.highestchallengecompletions[11] > 0 ? 'true' : 'false'
  document.documentElement.dataset.chal12 = player.highestchallengecompletions[12] > 0 ? 'true' : 'false'
  document.documentElement.dataset.chal13 = player.highestchallengecompletions[13] > 0 ? 'true' : 'false'
  document.documentElement.dataset.chal14 = player.highestchallengecompletions[14] > 0 ? 'true' : 'false'

  document.documentElement.dataset.ascendUnlock = player.ascensionCount > 0 ? 'true' : 'false'
  document.documentElement.dataset.prestigeUnlock = player.unlocks.prestige ? 'true' : 'false'

  document.documentElement.dataset.research150 = player.researches[150] > 0 ? 'true' : 'false'

  document.documentElement.dataset.cubeUpgrade10 = player.cubeUpgrades[10] > 0 ? 'true' : 'false'
  document.documentElement.dataset.cubeUpgrade19 = player.cubeUpgrades[19] > 0 ? 'true' : 'false'

  document.documentElement.dataset.sacrificeAnts = player.achievements[173] === 1 ? 'true' : 'false'

  document.documentElement.dataset.hepteracts = // Ability to use and gain hepteracts
    player.challenge15Exponent >= G.challenge15Rewards.hepteractsUnlocked.requirement ? 'true' : 'false'

  document.documentElement.dataset.singularity = // Ability to view singularity features
    player.highestSingularityCount >= 1 ? 'true' : 'false'

  visualUpdateShop()

  const hepts = DOMCacheGetOrSet('corruptionHepteracts')
  hepts.style.display = (player.achievements[255] > 0) ? 'block' : 'none'

  document.documentElement.dataset.cookies1 = player.singularityUpgrades.cookies.getEffect().bonus ? 'true' : 'false'
  document.documentElement.dataset.cookies2 = player.singularityUpgrades.cookies2.getEffect().bonus ? 'true' : 'false'
  document.documentElement.dataset.cookies3 = player.singularityUpgrades.cookies3.getEffect().bonus ? 'true' : 'false'
  document.documentElement.dataset.cookies4 = player.singularityUpgrades.cookies4.getEffect().bonus ? 'true' : 'false'
  document.documentElement.dataset.cookies5 = player.singularityUpgrades.cookies5.getEffect().bonus ? 'true' : 'false'

  document.documentElement.dataset.goldenQuark3Upg =
    (player.singularityUpgrades.goldenQuarks3.getEffect().bonus as number) > 0 ? 'true' : 'false'

  if (player.upgrades[89] === 1) {
    DOMCacheGetOrSet('transcendautotoggle').style.display = 'block'
    DOMCacheGetOrSet('transcendamount').style.display = 'block'
    DOMCacheGetOrSet('autotranscend').style.display = 'block'
  } else {
    DOMCacheGetOrSet('transcendautotoggle').style.display = 'none'
    DOMCacheGetOrSet('transcendamount').style.display = 'none'
    DOMCacheGetOrSet('autotranscend').style.display = 'none'
  }

  if (player.achievements[38] === 1) { // Prestige Diamond Achievement 3
    DOMCacheGetOrSet('rune2area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower2').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune2area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower2').style.display = 'none'
  }

  if (player.achievements[43] === 1) { // Transcend Mythos Achievement 1
    DOMCacheGetOrSet('prestigeautotoggle').style.display = 'block'
    DOMCacheGetOrSet('prestigeamount').style.display = 'block'
    DOMCacheGetOrSet('autoprestige').style.display = 'block'
  } else {
    DOMCacheGetOrSet('prestigeautotoggle').style.display = 'none'
    DOMCacheGetOrSet('prestigeamount').style.display = 'none'
    DOMCacheGetOrSet('autoprestige').style.display = 'none'
  }

  if (player.achievements[44] === 1) { // Transcend Mythos Achievement 2
    DOMCacheGetOrSet('rune3area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower3').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune3area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower3').style.display = 'none'
  }

  if (player.achievements[102] === 1) { // Cost+ Challenge Achievement 4
    DOMCacheGetOrSet('rune4area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower4').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune4area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower4').style.display = 'none'
  }

  player.achievements[119] === 1 // Tax+ Challenge Achievement 7
    ? DOMCacheGetOrSet('talisman1area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman1area').style.display = 'none'

  player.achievements[126] === 1 // No MA Challenge Achievement 7
    ? DOMCacheGetOrSet('talisman2area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman2area').style.display = 'none'

  player.achievements[133] === 1 // Cost++ Challenge Achievement 7
    ? DOMCacheGetOrSet('talisman3area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman3area').style.display = 'none'

  if (player.achievements[134] === 1) { // No Runes Challenge Achievement 1
    DOMCacheGetOrSet('toggleRuneSubTab2').style.display = 'block'
    DOMCacheGetOrSet('toggleRuneSubTab3').style.display = 'block'
  } else {
    DOMCacheGetOrSet('toggleRuneSubTab2').style.display = 'none'
    DOMCacheGetOrSet('toggleRuneSubTab3').style.display = 'none'
  }

  player.achievements[140] === 1 // No Runes Challenge Achievement 7
    ? DOMCacheGetOrSet('talisman4area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman4area').style.display = 'none'

  player.achievements[147] === 1 // Sadistic Challenge Achievement 7
    ? DOMCacheGetOrSet('talisman5area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman5area').style.display = 'none'

  player.achievements[173] === 1 // Galactic Crumb Achievement 5
    ? DOMCacheGetOrSet('sacrificeAnts').style.display = 'block'
    : DOMCacheGetOrSet('sacrificeAnts').style.display = 'none'

  player.researches[39] > 0 // 3x9 Research [Crystal Building Power]
    ? DOMCacheGetOrSet('reincarnationCrystalInfo').style.display = 'block'
    : DOMCacheGetOrSet('reincarnationCrystalInfo').style.display = 'none'

  player.researches[40] > 0 // 3x10 Research [Mythos Shard Building Power]
    ? DOMCacheGetOrSet('reincarnationMythosInfo').style.display = 'block'
    : DOMCacheGetOrSet('reincarnationMythosInfo').style.display = 'none'

  player.researches[46] > 0 // 5x6 Research [Auto R.]
    ? DOMCacheGetOrSet('reincarnateautomation').style.display = 'block'
    : DOMCacheGetOrSet('reincarnateautomation').style.display = 'none'

  if (player.researches[82] > 0) { // 2x17 Research [SI Rune Unlock]
    DOMCacheGetOrSet('rune5area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower5').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune5area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower5').style.display = 'none'
  }

  if (player.researches[124] > 0) { // 5x24 Research [AutoSac]
    DOMCacheGetOrSet('antSacrificeButtons').style.display = 'flex'
    DOMCacheGetOrSet('autoAntSacrifice').style.display = 'block'
  } else {
    DOMCacheGetOrSet('antSacrificeButtons').style.display = 'none'
    DOMCacheGetOrSet('autoAntSacrifice').style.display = 'none'
  }

  player.researches[124] > 0 || player.highestSingularityCount > 0 // So you can turn it off before 5x24 Research
    ? DOMCacheGetOrSet('toggleAutoSacrificeAnt').style.display = 'block'
    : DOMCacheGetOrSet('toggleAutoSacrificeAnt').style.display = 'none'

  player.researches[130] > 0 // 6x5 Research [Talisman Auto Fortify]
    ? DOMCacheGetOrSet('toggleautofortify').style.display = 'block'
    : DOMCacheGetOrSet('toggleautofortify').style.display = 'none'

  player.researches[135] > 0 // 6x10 Research [Talisman Auto Sac]
    ? DOMCacheGetOrSet('toggleautoenhance').style.display = 'block'
    : DOMCacheGetOrSet('toggleautoenhance').style.display = 'none'

  for (let z = 1; z <= 5; z++) {
    ;(player.researches[190] > 0) // 8x15 Research [Auto Tesseracts]
      ? DOMCacheGetOrSet(`tesseractAutoToggle${z}`).style.display = 'block'
      : DOMCacheGetOrSet(`tesseractAutoToggle${z}`).style.display = 'none'
  }
  player.researches[190] > 0 // 8x15 Research [Auto Tesseracts]
    ? DOMCacheGetOrSet('tesseractautobuytoggle').style.display = 'block'
    : DOMCacheGetOrSet('tesseractautobuytoggle').style.display = 'none'
  player.researches[190] > 0 // 8x15 Research [Auto Tesseracts]
    ? DOMCacheGetOrSet('tesseractautobuymode').style.display = 'block'
    : DOMCacheGetOrSet('tesseractautobuymode').style.display = 'none'
  player.researches[190] > 0 // 8x15 Research [Auto Tesseracts]
    ? DOMCacheGetOrSet('tesseractAmount').style.display = 'block'
    : DOMCacheGetOrSet('tesseractAmount').style.display = 'none'
  player.researches[190] > 0 // 8x15 Research [Auto Tesseracts]
    ? DOMCacheGetOrSet('autotessbuyeramount').style.display = 'block'
    : DOMCacheGetOrSet('autotessbuyeramount').style.display = 'none'
  ;(player.antUpgrades[11]! > 0 || player.ascensionCount > 0) // Ant Talisman Unlock, Mortuus
    ? DOMCacheGetOrSet('talisman6area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman6area').style.display = 'none'

  player.shopUpgrades.offeringAuto > 0 // Auto Offering Shop Purchase
    ? DOMCacheGetOrSet('toggleautosacrifice').style.display = 'block'
    : DOMCacheGetOrSet('toggleautosacrifice').style.display = 'none'

  player.cubeUpgrades[51] > 0 && player.highestSingularityCount >= 40 // Auto Fragments Buy (After Cx1)
    ? DOMCacheGetOrSet('toggleautoBuyFragments').style.display = 'block'
    : DOMCacheGetOrSet('toggleautoBuyFragments').style.display = 'none'

  player.shopUpgrades.obtainiumAuto > 0 // Auto Research Shop Purchase
    ? DOMCacheGetOrSet('toggleautoresearch').style.display = 'block'
    : DOMCacheGetOrSet('toggleautoresearch').style.display = 'none'

  DOMCacheGetOrSet('toggleautoresearchmode').style.display =
    player.shopUpgrades.obtainiumAuto > 0 && autoResearchEnabled() // Auto Research Shop Purchase Mode
      ? 'block'
      : 'none'

  isShopTalismanUnlocked() // Plastic Talisman Shop Purchase
    ? DOMCacheGetOrSet('talisman7area').style.display = 'flex'
    : DOMCacheGetOrSet('talisman7area').style.display = 'none'

  player.cubeUpgrades[8] > 0
    ? DOMCacheGetOrSet('reincarnateAutoUpgrade').style.display = 'block'
    : DOMCacheGetOrSet('reincarnateAutoUpgrade').style.display = 'none'

  if (isIARuneUnlocked()) {
    DOMCacheGetOrSet('rune6area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower6').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune6area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower6').style.display = 'none'
  }

  if (player.platonicUpgrades[20] > 0) {
    DOMCacheGetOrSet('rune7area').style.display = 'flex'
    DOMCacheGetOrSet('runeshowpower7').style.display = 'block'
  } else {
    DOMCacheGetOrSet('rune7area').style.display = 'none'
    DOMCacheGetOrSet('runeshowpower7').style.display = 'none'
  }

  player.highestSingularityCount > 0 // Save Offerings
    ? DOMCacheGetOrSet('saveOffToggle').style.display = 'block'
    : DOMCacheGetOrSet('saveOffToggle').style.display = 'none'

  // Auto Open Cubes toggle
  if (player.highestSingularityCount >= 35) {
    DOMCacheGetOrSet('openCubes').style.display = 'block'
    DOMCacheGetOrSet('cubeOpensInput').style.display = 'block'
    DOMCacheGetOrSet('openTesseracts').style.display = 'block'
    DOMCacheGetOrSet('tesseractsOpensInput').style.display = 'block'
    DOMCacheGetOrSet('openHypercubes').style.display = 'block'
    DOMCacheGetOrSet('hypercubesOpensInput').style.display = 'block'
    DOMCacheGetOrSet('openPlatonicCube').style.display = 'block'
    DOMCacheGetOrSet('platonicCubeOpensInput').style.display = 'block'
  } else {
    DOMCacheGetOrSet('openCubes').style.display = 'none'
    DOMCacheGetOrSet('cubeOpensInput').style.display = 'none'
    DOMCacheGetOrSet('openTesseracts').style.display = 'none'
    DOMCacheGetOrSet('tesseractsOpensInput').style.display = 'none'
    DOMCacheGetOrSet('openHypercubes').style.display = 'none'
    DOMCacheGetOrSet('hypercubesOpensInput').style.display = 'none'
    DOMCacheGetOrSet('openPlatonicCube').style.display = 'none'
    DOMCacheGetOrSet('platonicCubeOpensInput').style.display = 'none'
  }

  ;(player.highestSingularityCount >= 50 && player.singularityCount < player.highestSingularityCount)
      || player.highestSingularityCount >= 150 // Auto Cube Upgrades
    ? DOMCacheGetOrSet('toggleAutoCubeUpgrades').style.display = 'block'
    : DOMCacheGetOrSet('toggleAutoCubeUpgrades').style.display = 'none'
  ;(player.highestSingularityCount >= 100 && player.singularityCount < player.highestSingularityCount)
      || player.highestSingularityCount >= 200 // Auto Platonic Upgrades
    ? DOMCacheGetOrSet('toggleAutoPlatonicUpgrades').style.display = 'block'
    : DOMCacheGetOrSet('toggleAutoPlatonicUpgrades').style.display = 'none'

  // Singularity confirmation toggle pic
  player.highestSingularityCount > 0 && player.ascensionCount > 0
    ? (DOMCacheGetOrSet('settingpic6').style.display = 'block')
    : (DOMCacheGetOrSet('settingpic6').style.display = 'none')

  // Hepteract Confirmations toggle
  player.highestSingularityCount > 0
    && player.challenge15Exponent >= G.challenge15Rewards.hepteractsUnlocked.requirement
    ? (DOMCacheGetOrSet('heptnotificationpic').style.display = 'block')
    : (DOMCacheGetOrSet('heptnotificationpic').style.display = 'none')

  DOMCacheGetOrSet('warpAuto').style.display = player.shopUpgrades.autoWarp > 0 ? '' : 'none'

  const octeractUnlocks = document.getElementsByClassName('octeracts') as HTMLCollectionOf<HTMLElement>
  for (const item of Array.from(octeractUnlocks)) { // Stuff that you need octeracts to access
    const parent = item.parentElement!
    if (parent.classList.contains('offlineStats')) {
      item.style.display = player.singularityUpgrades.octeractUnlock.getEffect().bonus ? 'flex' : 'none'
      item.setAttribute('aria-disabled', `${!player.singularityUpgrades.octeractUnlock.getEffect().bonus}`)
    } else {
      item.style.display = player.singularityUpgrades.octeractUnlock.getEffect().bonus ? 'block' : 'none'
      item.setAttribute('aria-disabled', `${!player.singularityUpgrades.octeractUnlock.getEffect().bonus}`)
    }
  }

  const singChallengeUnlocks = document.getElementsByClassName('singChallenges') as HTMLCollectionOf<HTMLElement>
  for (const item of Array.from(singChallengeUnlocks)) {
    item.style.display = player.highestSingularityCount >= 25 ? 'block' : 'none'
  }

  const exalt1x1Unlocks = document.getElementsByClassName('Exalt1x1') as HTMLCollectionOf<HTMLElement>
  for (const item of Array.from(exalt1x1Unlocks)) {
    const parent = item.parentElement!
    if (parent.classList.contains('offlineStats')) {
      item.style.display = player.singularityChallenges.noSingularityUpgrades.completions >= 1 ? 'flex' : 'none'
      item.setAttribute('aria-disabled', `${player.singularityChallenges.noSingularityUpgrades.completions < 1}`)
    } else {
      item.style.visibility = player.singularityChallenges.noSingularityUpgrades.completions >= 1 ? 'visible' : 'hidden'
      item.setAttribute('aria-disabled', `${player.singularityChallenges.noSingularityUpgrades.completions < 1}`)
    }
  }

  const exalt5x1Unlocks = document.getElementsByClassName('Exalt5x1') as HTMLCollectionOf<HTMLElement>
  for (const item of Array.from(exalt5x1Unlocks)) {
    const parent = item.parentElement!
    if (parent.classList.contains('offlineStats')) {
      item.style.display = player.singularityChallenges.noAmbrosiaUpgrades.completions >= 1 ? 'flex' : 'none'
      item.setAttribute('aria-disabled', `${player.singularityChallenges.noAmbrosiaUpgrades.completions < 1}`)
    } else {
      item.style.visibility = player.singularityChallenges.noAmbrosiaUpgrades.completions >= 1 ? 'visible' : 'hidden'
      item.setAttribute('aria-disabled', `${player.singularityChallenges.noAmbrosiaUpgrades.completions < 1}`)
    }
  }

  DOMCacheGetOrSet('toggleSingularitySubTab4').style.display = player.highestSingularityCount >= 25
    ? 'block'
    : 'none'
  // Hide Challenge Subtabs until Exalts are unlocked
  DOMCacheGetOrSet('challengesTabsToggle').style.display = player.highestSingularityCount >= 25
    ? 'flex'
    : 'none'

  player.runelevels[6] > 0 || player.highestSingularityCount > 0
    ? (DOMCacheGetOrSet('singularitybtn').style.display = 'block')
    : (DOMCacheGetOrSet('singularitybtn').style.display = 'none')

  DOMCacheGetOrSet('ascSingChallengeTimeTakenStats').style.display = player.insideSingularityChallenge ? '' : 'none'

  DOMCacheGetOrSet('ascensionStats').style.visibility =
    (player.achievements[197] > 0 || player.highestSingularityCount > 0) ? 'visible' : 'hidden'
  DOMCacheGetOrSet('ascHyperStats').style.display = player.challengecompletions[13] > 0 ? '' : 'none'
  DOMCacheGetOrSet('ascPlatonicStats').style.display = player.challengecompletions[14] > 0 ? '' : 'none'
  DOMCacheGetOrSet('ascHepteractStats').style.display = player.achievements[255] > 0 ? '' : 'none'

  // I'll clean this up later. Note to 2019 Platonic: Fuck you
  // note to 2019 and 2020 Platonic, you're welcome
  // note to 2019 and 2020 and 2021 Platonic, please never base anything on the order of elements ever again

  // These are currently listed in the order they were in when this was converted to use element IDs instead of
  // the ordering of the HTML elements with the class "auto".
  const automationUnlocks: Record<string, boolean> = {
    toggle1: player.upgrades[81] === 1, // Autobuyer - Coin Buildings - Tier 1 (Worker)
    toggle2: player.upgrades[82] === 1, // Autobuyer - Coin Buildings - Tier 2 (Investments)
    toggle3: player.upgrades[83] === 1, // Autobuyer - Coin Buildings - Tier 3 (Printers)
    toggle4: player.upgrades[84] === 1, // Autobuyer - Coin Buildings - Tier 4 (Coin Mints)
    toggle5: player.upgrades[85] === 1, // Autobuyer - Coin Buildings - Tier 5 (Alchemies)
    toggle6: player.upgrades[86] === 1, // Autobuyer - Coin Buildings - Accelerator
    toggle7: player.upgrades[87] === 1, // Autobuyer - Coin Buildings - Multiplier
    toggle8: player.upgrades[88] === 1, // Autobuyer - Coin Buildings - Accelerator Boost
    toggle10: player.achievements[78] === 1, // Autobuyer - Diamond Buildings - Tier 1 (Refineries)
    toggle11: player.achievements[85] === 1, // Autobuyer - Diamond Buildings - Tier 2 (Coal Plants)
    toggle12: player.achievements[92] === 1, // Autobuyer - Diamond Buildings - Tier 3 (Coal Rigs)
    toggle13: player.achievements[99] === 1, // Autobuyer - Diamond Buildings - Tier 4 (Pickaxes)
    toggle14: player.achievements[106] === 1, // Autobuyer - Diamond Buildings - Tier 5 (Pandora's Boxes)
    toggle15: player.achievements[43] === 1, // Feature - Diamond Buildings - Auto Prestige
    toggle16: player.upgrades[94] === 1, // Autobuyer - Mythos Buildings - Tier 1 (Augments)
    toggle17: player.upgrades[95] === 1, // Autobuyer - Mythos Buildings - Tier 2 (Enchantments)
    toggle18: player.upgrades[96] === 1, // Autobuyer - Mythos Buildings - Tier 3 (Wizards)
    toggle19: player.upgrades[97] === 1, // Autobuyer - Mythos Buildings - Tier 4 (Oracles)
    toggle20: player.upgrades[98] === 1, // Autobuyer - Mythos Buildings - Tier 5 (Grandmasters)
    toggle21: player.upgrades[89] === 1, // Feature - Mythos Buildings - Auto Transcend
    toggle22: player.cubeUpgrades[7] === 1, // Autobuyer - Particle Buildings - Tier 1 (Protons)
    toggle23: player.cubeUpgrades[7] === 1, // Autobuyer - Particle Buildings - Tier 2 (Elements)
    toggle24: player.cubeUpgrades[7] === 1, // Autobuyer - Particle Buildings - Tier 3 (Pulsars)
    toggle25: player.cubeUpgrades[7] === 1, // Autobuyer - Particle Buildings - Tier 4 (Quasars)
    toggle26: player.cubeUpgrades[7] === 1, // Autobuyer - Particle Buildings - Tier 5 (Galactic Nuclei)
    toggle27: player.researches[46] === 1, // Feature - Particle Buildings - Auto Reincarnate
    coinAutoUpgrade: player.upgrades[91] === 1, // Feature - Upgrades - Auto Buy Coin Upgrades
    prestigeAutoUpgrade: player.upgrades[92] === 1, // Feature - Upgrades - Auto Buy Diamond Upgrades
    transcendAutoUpgrade: player.upgrades[99] === 1, // Feature - Upgrades - Auto Buy Mythos Upgrades
    generatorsAutoUpgrade: player.upgrades[90] === 1, // Feature - Upgrades - Auto Buy Generator Upgrades
    toggle9: player.unlocks.prestige, // Feature - Upgrades - Hover to Buy
    toggle28: player.prestigeCount > 0.5 || player.reincarnationCount > 0.5, // Settings - Confirmations - Prestige
    toggle29: player.transcendCount > 0.5 || player.reincarnationCount > 0.5, // Settings - Confirmations - Transcension
    toggle30: player.reincarnationCount > 0.5, // Settings - Confirmations - Reincarnation
    toggle31: player.ascensionCount > 0, // Settings - Confirmations - Ascension and Asc. Challenge
    toggle32: player.achievements[173] > 0, // Settings - Confirmations - Ant Sacrifice
    toggle33: player.highestSingularityCount > 0 && player.ascensionCount > 0, // Settings - Confirmations - Singularity
    toggle34: player.unlocks.coinfour, // Achievements - Notifications
    toggle35: player.challenge15Exponent >= G.challenge15Rewards.hepteractsUnlocked.requirement
      && player.highestSingularityCount > 0, // Hepteracts - Notifications
    toggle36: player.highestSingularityCount >= 15, // Auto Blessings
    toggle37: player.highestSingularityCount >= 15, // Auto Spirits
    toggle38: player.highestSingularityCount > 0, // Researchs Hover to Buy
    toggle39: player.unlocks.prestige, // Hotkeys
    toggle40: player.unlocks.prestige, // Number Hotkeys
    toggle41: player.challengecompletions[11] > 0, // Loadouts Notifx
    toggle42: player.highestSingularityCount >= 6, // Potion Autogenerator for Offering Potions
    toggle43: player.highestSingularityCount >= 6 // Potion Autogenerator for Obtainium Potions
  }

  Object.keys(automationUnlocks).forEach((key) => {
    const el = DOMCacheGetOrSet(key) as HTMLElement | null
    if (el === null) {
      console.error(`Automation unlock failed to find element with ID '${key}'.`)
      return
    }

    el.style.display = automationUnlocks[key] ? 'block' : 'none'
  })

  revealCorruptions()
}

export const hideStuff = () => {
  DOMCacheGetOrSet('buildings').style.display = 'none'
  DOMCacheGetOrSet('buildingstab').style.backgroundColor = ''
  DOMCacheGetOrSet('upgrades').style.display = 'none'
  DOMCacheGetOrSet('upgradestab').style.backgroundColor = ''
  DOMCacheGetOrSet('settings').style.display = 'none'

  DOMCacheGetOrSet('statistics').style.display = 'none'
  DOMCacheGetOrSet('achievementstab').style.backgroundColor = ''
  DOMCacheGetOrSet('achievementstab').style.color = 'white'
  DOMCacheGetOrSet('runes').style.display = 'none'
  DOMCacheGetOrSet('runestab').style.backgroundColor = ''
  DOMCacheGetOrSet('challenges').style.display = 'none'
  DOMCacheGetOrSet('challengetab').style.backgroundColor = ''
  DOMCacheGetOrSet('research').style.display = 'none'
  DOMCacheGetOrSet('researchtab').style.backgroundColor = ''
  DOMCacheGetOrSet('shop').style.display = 'none'
  DOMCacheGetOrSet('shoptab').style.backgroundColor = ''
  DOMCacheGetOrSet('ants').style.display = 'none'
  DOMCacheGetOrSet('anttab').style.backgroundColor = ''
  DOMCacheGetOrSet('cubetab').style.backgroundColor = ''
  DOMCacheGetOrSet('campaigntab').style.backgroundColor = ''
  DOMCacheGetOrSet('campaigns').style.display = 'none'
  DOMCacheGetOrSet('traitstab').style.backgroundColor = ''
  DOMCacheGetOrSet('cubes').style.display = 'none'
  DOMCacheGetOrSet('traits').style.display = 'none'
  DOMCacheGetOrSet('singularity').style.display = 'none'
  DOMCacheGetOrSet('singularitytab').style.backgroundColor = ''
  DOMCacheGetOrSet('event').style.display = 'none'
  DOMCacheGetOrSet('eventtab').style.backgroundColor = ''
  document.getElementById('pseudoCoins')?.style.setProperty('display', 'none')
  DOMCacheGetOrSet('pseudoCoinstab').style.backgroundColor = ''

  const tab = DOMCacheGetOrSet('settingstab')!
  tab.style.backgroundColor = ''
  tab.style.borderColor = 'white'

  if (G.currentTab === Tabs.Buildings) {
    DOMCacheGetOrSet('buildingstab').style.backgroundColor = 'orange'
    DOMCacheGetOrSet('buildings').style.display = 'block'
  }
  if (G.currentTab === Tabs.Upgrades) {
    DOMCacheGetOrSet('upgrades').style.display = 'block'
    DOMCacheGetOrSet('upgradestab').style.backgroundColor = 'orange'
    DOMCacheGetOrSet('upgradedescription').textContent = i18next.t('upgrades.hoverOverUpgrade')
  }
  if (G.currentTab === Tabs.Settings) {
    DOMCacheGetOrSet('settings').style.display = 'block'
    const tab = DOMCacheGetOrSet('settingstab')!
    tab.style.backgroundColor = 'orange'
    tab.style.borderColor = 'gold'
  }
  if (G.currentTab === Tabs.Achievements) {
    DOMCacheGetOrSet('statistics').style.display = 'block'
    DOMCacheGetOrSet('achievementstab').style.backgroundColor = 'white'
    DOMCacheGetOrSet('achievementstab').style.color = 'black'
    DOMCacheGetOrSet('achievementprogress').textContent = i18next.t('achievements.totalPoints', {
      x: format(player.achievementPoints),
      y: format(totalachievementpoints),
      z: (100 * player.achievementPoints / totalachievementpoints).toPrecision(4)
    })
    DOMCacheGetOrSet('achievementQuarkBonus').innerHTML = i18next.t('achievements.quarkBonus', {
      multiplier: format(1 + player.achievementPoints / 50000, 3, true)
    })
  } else if (G.currentTab === Tabs.Runes) {
    DOMCacheGetOrSet('runes').style.display = 'block'
    DOMCacheGetOrSet('runestab').style.backgroundColor = 'blue'
    DOMCacheGetOrSet('runeshowlevelup').textContent = i18next.t('runes.hover')
    DOMCacheGetOrSet('researchrunebonus').textContent = i18next.t('runes.thanksResearches', {
      percent: format(100 * G.effectiveLevelMult - 100, 4, true)
    })
    displayRuneInformation(1, false)
    displayRuneInformation(2, false)
    displayRuneInformation(3, false)
    displayRuneInformation(4, false)
    displayRuneInformation(5, false)
    displayRuneInformation(6, false)
    displayRuneInformation(7, false)
  }
  if (G.currentTab === Tabs.Challenges) {
    DOMCacheGetOrSet('challenges').style.display = 'block'
    DOMCacheGetOrSet('challengetab').style.backgroundColor = 'purple'
  }
  if (G.currentTab === Tabs.Research) {
    DOMCacheGetOrSet('research').style.display = 'block'
    DOMCacheGetOrSet('researchtab').style.backgroundColor = 'green'
  }
  if (G.currentTab === Tabs.Shop) {
    DOMCacheGetOrSet('shop').style.display = 'block'
    DOMCacheGetOrSet('shoptab').style.backgroundColor = 'limegreen'
  }
  if (G.currentTab === Tabs.AntHill) {
    DOMCacheGetOrSet('ants').style.display = 'block'
    DOMCacheGetOrSet('anttab').style.backgroundColor = 'brown'
  }
  if (G.currentTab === Tabs.WowCubes) {
    DOMCacheGetOrSet('cubes').style.display = 'flex'
    DOMCacheGetOrSet('cubetab').style.backgroundColor = 'white'
  }
  if (G.currentTab === Tabs.Campaign) {
    DOMCacheGetOrSet('campaigns').style.display = 'block'
    DOMCacheGetOrSet('campaigntab').style.backgroundColor = 'red'
  }
  if (G.currentTab === Tabs.Corruption) {
    DOMCacheGetOrSet('traits').style.display = 'flex'
    DOMCacheGetOrSet('traitstab').style.backgroundColor = 'white'
  }

  if (G.currentTab === Tabs.Singularity) {
    DOMCacheGetOrSet('singularity').style.display = 'block'
    DOMCacheGetOrSet('singularitytab').style.backgroundColor = 'lightgoldenrodyellow'
    updateSingularityPenalties()
    updateSingularityPerks()
  }

  if (G.currentTab === Tabs.Event) {
    DOMCacheGetOrSet('event').style.display = 'block'
    DOMCacheGetOrSet('eventtab').style.backgroundColor = 'gold'
  }

  if (G.currentTab === Tabs.Purchase) {
    initializeCart()

    document.getElementById('pseudoCoins')?.style.setProperty('display', 'unset')
    DOMCacheGetOrSet('pseudoCoinstab').style.backgroundColor = 'orange'
  }
}

const visualTab: Record<Tabs, () => void> = {
  [Tabs.Buildings]: visualUpdateBuildings,
  [Tabs.Upgrades]: visualUpdateUpgrades,
  [Tabs.Achievements]: visualUpdateAchievements,
  [Tabs.Runes]: visualUpdateRunes,
  [Tabs.Challenges]: visualUpdateChallenges,
  [Tabs.Research]: visualUpdateResearch,
  [Tabs.Settings]: visualUpdateSettings,
  [Tabs.Shop]: visualUpdateShop,
  [Tabs.AntHill]: visualUpdateAnts,
  [Tabs.WowCubes]: visualUpdateCubes,
  [Tabs.Campaign]: visualUpdateCampaign,
  [Tabs.Corruption]: visualUpdateCorruptions,
  [Tabs.Singularity]: visualUpdateSingularity,
  [Tabs.Event]: visualUpdateEvent,
  [Tabs.Purchase]: visualUpdatePurchase
}

export const htmlInserts = () => {
  // ALWAYS Update these, for they are the most important resources
  const playerRequirements = [
    'coins',
    'runeshards',
    'prestigePoints',
    'transcendPoints',
    'transcendShards',
    'reincarnationPoints',
    'worlds',
    'researchPoints'
  ] as const
  const domRequirements = [
    'coinDisplay',
    'offeringDisplay',
    'diamondDisplay',
    'mythosDisplay',
    'mythosshardDisplay',
    'particlesDisplay',
    'quarkDisplay',
    'obtainiumDisplay'
  ] as const
  for (let i = 0; i < playerRequirements.length; i++) {
    const text = format(player[`${playerRequirements[i]}` as const])
    const dom = DOMCacheGetOrSet(`${domRequirements[i]}` as const)
    if (dom.textContent !== text) {
      dom.textContent = text
    }
  }

  updateAscensionStats()

  visualTab[G.currentTab]()
}

// TODO(not @KhafraDev): cache the elements and stop getting them every time?
export const buttoncolorchange = () => {
  DOMCacheGetOrSet('prestigebtn').style.backgroundColor = player.toggles[15] && player.achievements[43] === 1
    ? 'green'
    : ''

  DOMCacheGetOrSet('transcendbtn').style.backgroundColor =
    player.toggles[21] && player.upgrades[89] > 0.5 && (player.currentChallenge.transcension === 0) ? 'green' : ''

  DOMCacheGetOrSet('reincarnatebtn').style.backgroundColor = player.toggles[27] && player.researches[46] > 0.5
      && (player.currentChallenge.transcension === 0 && player.currentChallenge.reincarnation === 0)
    ? 'green'
    : ''

  DOMCacheGetOrSet('acceleratorboostbtn').style.backgroundColor = player.toggles[8] && player.upgrades[88] > 0.5
    ? 'green'
    : ''

  DOMCacheGetOrSet('challengebtn').style.backgroundColor = player.currentChallenge.transcension === 0 ? '' : 'purple'

  DOMCacheGetOrSet('reincarnatechallengebtn').style.backgroundColor = player.currentChallenge.reincarnation === 0
    ? ''
    : 'purple'

  DOMCacheGetOrSet('ascendChallengeBtn').style.backgroundColor = player.currentChallenge.ascension === 0 ? '' : 'purple'

  DOMCacheGetOrSet('ascendbtn').style.backgroundColor =
    player.autoAscend && player.challengecompletions[11] > 0 && player.cubeUpgrades[10] > 0 ? 'green' : ''

  DOMCacheGetOrSet('singularitybtn').style.filter = player.runelevels[6] > 0
    ? ''
    : 'contrast(1.25) sepia(1) grayscale(0.25)'

  // Notify new players the reset
  if (player.toggles[33] && player.highestSingularityCount === 0) {
    if (player.toggles[28] && !player.unlocks.prestige) {
      DOMCacheGetOrSet('prestigebtn').style.boxShadow = player.coinsThisPrestige.gte(1e16)
        ? 'cyan 0px 0px 10px 2px'
        : ''
    }
    if (player.toggles[29] && !player.unlocks.transcend) {
      DOMCacheGetOrSet('transcendbtn').style.boxShadow = player.coinsThisTranscension.gte(1e100)
        ? 'plum 0px 0px 10px 2px'
        : ''
    }
    if (player.toggles[30] && !player.unlocks.reincarnate) {
      DOMCacheGetOrSet('reincarnatebtn').style.boxShadow = player.transcendShards.gte(1e300)
        ? 'greenyellow 0px 0px 10px 2px'
        : ''
    }
    if (player.toggles[31] && player.ascensionCount === 0) {
      DOMCacheGetOrSet('ascendbtn').style.boxShadow = player.challengecompletions[10] > 0
        ? 'orange 0px 0px 10px 2px'
        : ''
    }
  }

  if (G.currentTab === Tabs.Buildings && G.buildingSubTab === 'coin') {
    const a = DOMCacheGetOrSet('buycoin1')
    const b = DOMCacheGetOrSet('buycoin2')
    const c = DOMCacheGetOrSet('buycoin3')
    const d = DOMCacheGetOrSet('buycoin4')
    const e = DOMCacheGetOrSet('buycoin5')
    const f = DOMCacheGetOrSet('buyaccelerator')
    const g = DOMCacheGetOrSet('buymultiplier')
    const h = DOMCacheGetOrSet('buyacceleratorboost')
    ;((!player.toggles[1] || player.upgrades[81] === 0) && player.coins.gte(player.firstCostCoin))
      ? a.classList.add('buildingPurchaseBtnAvailable')
      : a.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[2] || player.upgrades[82] === 0) && player.coins.gte(player.secondCostCoin))
      ? b.classList.add('buildingPurchaseBtnAvailable')
      : b.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[3] || player.upgrades[83] === 0) && player.coins.gte(player.thirdCostCoin))
      ? c.classList.add('buildingPurchaseBtnAvailable')
      : c.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[4] || player.upgrades[84] === 0) && player.coins.gte(player.fourthCostCoin))
      ? d.classList.add('buildingPurchaseBtnAvailable')
      : d.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[5] || player.upgrades[85] === 0) && player.coins.gte(player.fifthCostCoin))
      ? e.classList.add('buildingPurchaseBtnAvailable')
      : e.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[6] || player.upgrades[86] === 0) && player.coins.gte(player.acceleratorCost))
      ? f.classList.add('buildingPurchaseBtnAvailable')
      : f.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[7] || player.upgrades[87] === 0) && player.coins.gte(player.multiplierCost))
      ? g.classList.add('buildingPurchaseBtnAvailable')
      : g.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[8] || player.upgrades[88] === 0) && player.prestigePoints.gte(player.acceleratorBoostCost))
      ? h.classList.add('buildingPurchaseBtnAvailable')
      : h.classList.remove('buildingPurchaseBtnAvailable')
  }

  if (G.currentTab === Tabs.Buildings && G.buildingSubTab === 'diamond') {
    const a = DOMCacheGetOrSet('buydiamond1')
    const b = DOMCacheGetOrSet('buydiamond2')
    const c = DOMCacheGetOrSet('buydiamond3')
    const d = DOMCacheGetOrSet('buydiamond4')
    const e = DOMCacheGetOrSet('buydiamond5')
    const f = DOMCacheGetOrSet('buycrystalupgrade1')
    const g = DOMCacheGetOrSet('buycrystalupgrade2')
    const h = DOMCacheGetOrSet('buycrystalupgrade3')
    const i = DOMCacheGetOrSet('buycrystalupgrade4')
    const j = DOMCacheGetOrSet('buycrystalupgrade5')
    ;((!player.toggles[10] || player.achievements[78] === 0) && player.prestigePoints.gte(player.firstCostDiamonds))
      ? a.classList.add('buildingPurchaseBtnAvailable')
      : a.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[11] || player.achievements[85] === 0) && player.prestigePoints.gte(player.secondCostDiamonds))
      ? b.classList.add('buildingPurchaseBtnAvailable')
      : b.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[12] || player.achievements[92] === 0) && player.prestigePoints.gte(player.thirdCostDiamonds))
      ? c.classList.add('buildingPurchaseBtnAvailable')
      : c.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[13] || player.achievements[99] === 0) && player.prestigePoints.gte(player.fourthCostDiamonds))
      ? d.classList.add('buildingPurchaseBtnAvailable')
      : d.classList.remove('buildingPurchaseBtnAvailable')
    ;((!player.toggles[14] || player.achievements[106] === 0) && player.prestigePoints.gte(player.fifthCostDiamonds))
      ? e.classList.add('buildingPurchaseBtnAvailable')
      : e.classList.remove('buildingPurchaseBtnAvailable')
    let k = 0
    k += Math.floor(G.rune3level / 16 * G.effectiveLevelMult) * 100 / 100
    if (player.upgrades[73] === 1 && player.currentChallenge.reincarnation !== 0) {
      k += 10
    }

    player.achievements[79] < 1
      ? (player.prestigeShards.gte(
          Decimal.pow(
            10,
            G.crystalUpgradesCost[0]
              + G.crystalUpgradeCostIncrement[0] * Math.floor(Math.pow(player.crystalUpgrades[0] + 0.5 - k, 2) / 2)
          )
        )
        ? f.style.backgroundColor = 'purple'
        : f.style.backgroundColor = '')
      : f.style.backgroundColor = 'green'
    player.achievements[86] < 1
      ? (player.prestigeShards.gte(
          Decimal.pow(
            10,
            G.crystalUpgradesCost[1]
              + G.crystalUpgradeCostIncrement[1] * Math.floor(Math.pow(player.crystalUpgrades[1] + 0.5 - k, 2) / 2)
          )
        )
        ? g.style.backgroundColor = 'purple'
        : g.style.backgroundColor = '')
      : g.style.backgroundColor = 'green'
    player.achievements[93] < 1
      ? (player.prestigeShards.gte(
          Decimal.pow(
            10,
            G.crystalUpgradesCost[2]
              + G.crystalUpgradeCostIncrement[2] * Math.floor(Math.pow(player.crystalUpgrades[2] + 0.5 - k, 2) / 2)
          )
        )
        ? h.style.backgroundColor = 'purple'
        : h.style.backgroundColor = '')
      : h.style.backgroundColor = 'green'
    player.achievements[100] < 1
      ? (player.prestigeShards.gte(
          Decimal.pow(
            10,
            G.crystalUpgradesCost[3]
              + G.crystalUpgradeCostIncrement[3] * Math.floor(Math.pow(player.crystalUpgrades[3] + 0.5 - k, 2) / 2)
          )
        )
        ? i.style.backgroundColor = 'purple'
        : i.style.backgroundColor = '')
      : i.style.backgroundColor = 'green'
    player.achievements[107] < 1
      ? (player.prestigeShards.gte(
          Decimal.pow(
            10,
            G.crystalUpgradesCost[4]
              + G.crystalUpgradeCostIncrement[4] * Math.floor(Math.pow(player.crystalUpgrades[4] + 0.5 - k, 2) / 2)
          )
        )
        ? j.style.backgroundColor = 'purple'
        : j.style.backgroundColor = '')
      : j.style.backgroundColor = 'green'
  }

  if (G.currentTab === Tabs.Runes) {
    if (getActiveSubTab() === 0) {
      for (let i = 1; i <= 7; i++) {
        player.runeshards > 0.5
          ? DOMCacheGetOrSet(`activaterune${i}`).classList.add('runeButtonAvailable')
          : DOMCacheGetOrSet(`activaterune${i}`).classList.remove('runeButtonAvailable')
      }
    }
    if (getActiveSubTab() === 1) {
      const a = DOMCacheGetOrSet('buyTalismanItem1')
      const b = DOMCacheGetOrSet('buyTalismanItem2')
      const c = DOMCacheGetOrSet('buyTalismanItem3')
      const d = DOMCacheGetOrSet('buyTalismanItem4')
      const e = DOMCacheGetOrSet('buyTalismanItem5')
      const f = DOMCacheGetOrSet('buyTalismanItem6')
      const g = DOMCacheGetOrSet('buyTalismanItem7')
      const arr = [a, b, c, d, e, f, g]
      for (let i = 0; i < arr.length; i++) {
        ;(player.researchPoints > G.talismanResourceObtainiumCosts[i]
            && player.runeshards > G.talismanResourceOfferingCosts[i])
          ? arr[i].classList.add('talisminBtnAvailable')
          : arr[i].classList.remove('talisminBtnAvailable')
      }
    }
  }

  if (G.currentTab === Tabs.Buildings && G.buildingSubTab === 'mythos') {
    for (let i = 1; i <= 5; i++) {
      const toggle = player.toggles[i + 15]
      const mythos = player[`${G.ordinals[i - 1 as ZeroToFour]}CostMythos` as const]
      ;(!toggle || !player.upgrades[93 + i]) && player.transcendPoints.gte(mythos)
        ? DOMCacheGetOrSet(`buymythos${i}`).classList.add('buildingPurchaseBtnAvailable')
        : DOMCacheGetOrSet(`buymythos${i}`).classList.remove('buildingPurchaseBtnAvailable')
    }
  }

  if (G.currentTab === Tabs.Buildings && G.buildingSubTab === 'particle') {
    for (let i = 1; i <= 5; i++) {
      const costParticles = player[`${G.ordinals[i - 1 as ZeroToFour]}CostParticles` as const]
      player.reincarnationPoints.gte(costParticles)
        ? DOMCacheGetOrSet(`buyparticles${i}`).classList.add('buildingPurchaseBtnAvailable')
        : DOMCacheGetOrSet(`buyparticles${i}`).classList.remove('buildingPurchaseBtnAvailable')
    }
  }

  if (G.currentTab === Tabs.Buildings && G.buildingSubTab === 'tesseract') {
    for (let i = 1; i <= 5; i++) {
      const ascendBuilding = player[`ascendBuilding${i as OneToFive}` as const].cost
      Number(player.wowTesseracts) >= ascendBuilding
        ? DOMCacheGetOrSet(`buyTesseracts${i}`).classList.add('buildingPurchaseBtnAvailable')
        : DOMCacheGetOrSet(`buyTesseracts${i}`).classList.remove('buildingPurchaseBtnAvailable')
    }
    for (let i = 1; i <= 8; i++) {
      if (player.researches[175] >= 1) {
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAvailable')
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.add('constUpgradeAuto')
      } else {
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAuto')
        ;(player.ascendShards.gte(Decimal.pow(10, player.constantUpgrades[i]!).times(G.constUpgradeCosts[i]!)))
          ? DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.add('constUpgradeAvailable')
          : DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAvailable')
      }
    }

    for (let i = 9; i <= 10; i++) {
      if (player.researches[175] >= 1 || player.constantUpgrades[i]! >= 1) {
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAvailable')
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.add('constUpgradeAuto')
      } else {
        DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAuto')
        ;(player.ascendShards.gte(Decimal.pow(10, player.constantUpgrades[i]!).times(G.constUpgradeCosts[i]!)))
          ? DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.add('constUpgradeAvailable')
          : DOMCacheGetOrSet(`buyConstantUpgrade${i}`).classList.remove('constUpgradeAvailable')
      }
    }
  }

  if (G.currentTab === Tabs.AntHill) {
    ;(player.reincarnationPoints.gte(player.firstCostAnts))
      ? DOMCacheGetOrSet('anttier1').classList.add('antTierBtnAvailable')
      : DOMCacheGetOrSet('anttier1').classList.remove('antTierBtnAvailable')
    for (let i = 2; i <= 8; i++) {
      const costAnts = player[`${G.ordinals[(i - 1) as ZeroToSeven]}CostAnts` as const]
      player.antPoints.gte(costAnts)
        ? DOMCacheGetOrSet(`anttier${i}`).classList.add('antTierBtnAvailable')
        : DOMCacheGetOrSet(`anttier${i}`).classList.remove('antTierBtnAvailable')
    }
    for (let i = 1; i <= 12; i++) {
      player.antPoints.gte(
          Decimal.pow(
            G.antUpgradeCostIncreases[i - 1],
            player.antUpgrades[i - 1]! * player.corruptions.used.corruptionEffects('extinction')
          ).times(G.antUpgradeBaseCost[i - 1])
        )
        ? DOMCacheGetOrSet(`antUpgrade${i}`).classList.add('antUpgradeBtnAvailable')
        : DOMCacheGetOrSet(`antUpgrade${i}`).classList.remove('antUpgradeBtnAvailable')
    }
  }
}

export const updateChallengeDisplay = () => {
  // Sets background colors on load/challenge initiation
  for (let k = 1; k <= 15; k++) {
    const el = DOMCacheGetOrSet(`challenge${k}`)
    el.classList.remove('challengeActive')
    if (player.currentChallenge.transcension === k) {
      el.classList.add('challengeActive')
    }
    if (player.currentChallenge.reincarnation === k) {
      el.classList.add('challengeActive')
    }
    if (player.currentChallenge.ascension === k) {
      el.classList.add('challengeActive')
    }
  }
  // Corrects HTML on retry challenges button
  if (player.retrychallenges) {
    DOMCacheGetOrSet('retryChallenge').textContent = i18next.t('challenges.retryChallengesOn')
  } else {
    DOMCacheGetOrSet('retryChallenge').textContent = i18next.t('challenges.retryChallengesOff')
  }
  for (let k = 1; k <= 15; k++) {
    updateChallengeLevel(k)
  }
}

export const updateChallengeLevel = (k: number) => {
  const el = DOMCacheGetOrSet(`challenge${k}level`)
  const maxChallenges = getMaxChallenges(k)

  if (k === 15) {
    el.textContent = format(player.challenge15Exponent, 0, false)
  } else {
    el.textContent = `${player.challengecompletions[k]}/${maxChallenges}`
  }
}

export const updateAchievementBG = () => {
  // When loading/importing, the game needs to correctly update achievement backgrounds.
  for (let i = 1; i <= 280; i++) { // Initiates by setting all to default
    DOMCacheGetOrSet(`ach${i}`).classList.remove('green-background')
  }
  const fixDisplay1 = document.getElementsByClassName('purpleach') as HTMLCollectionOf<HTMLElement>
  const fixDisplay2 = document.getElementsByClassName('redach') as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < fixDisplay1.length; i++) {
    fixDisplay1[i].style.backgroundColor = 'purple' // Sets the appropriate achs to purple
  }
  for (let i = 0; i < fixDisplay2.length; i++) {
    fixDisplay2[i].style.backgroundColor = 'maroon' // Sets the appropriate achs to maroon (red)
  }
  for (let i = 1; i < player.achievements.length; i++) {
    if (player.achievements[i] > 0.5) {
      achievementaward(i) // This sets all completed ach to green
    }
  }
}

export const showCorruptionStatsLoadouts = () => {
  const statsButton = DOMCacheGetOrSet('corrStatsBtn')
  const corrLoadoutsButton = DOMCacheGetOrSet('corrLoadoutsBtn')

  if (player.corruptions.showStats) {
    DOMCacheGetOrSet('corruptionStats').style.display = 'flex'
    DOMCacheGetOrSet('corruptionLoadouts').style.display = 'none'
    statsButton.classList.add('subtab-active')
    corrLoadoutsButton.classList.remove('subtab-active')
  } else {
    DOMCacheGetOrSet('corruptionStats').style.display = 'none'
    DOMCacheGetOrSet('corruptionLoadouts').style.display = 'flex'
    statsButton.classList.remove('subtab-active')
    corrLoadoutsButton.classList.add('subtab-active')
  }
}

const updateAscensionStats = () => {
  let t = player.ascensionCounter
  // Division by 0 is not defined
  if (t === 0) {
    t = 1
  }
  const [cubes, tess, hyper, platonic, hepteract] = CalcCorruptionStuff().slice(4)
  const addedAsterisk = player.singularityUpgrades.oneMind.getEffect().bonus
  const fillers: Record<string, string> = {
    ascLen: formatTimeShort(player.ascStatToggles[6] ? player.ascensionCounter : player.ascensionCounterReal, 0),
    ascCubes: format(cubes * (player.ascStatToggles[1] ? 1 : 1 / t), 2),
    ascTess: format(tess * (player.ascStatToggles[2] ? 1 : 1 / t), 3),
    ascHyper: format(hyper * (player.ascStatToggles[3] ? 1 : 1 / t), 4),
    ascPlatonic: format(platonic * (player.ascStatToggles[4] ? 1 : 1 / t), 5),
    ascHepteract: format(hepteract * (player.ascStatToggles[5] ? 1 : 1 / t), 3),
    ascC10: `${format(player.challengecompletions[10])}`,
    ascTimeAccel: `${format(calculateGlobalSpeedMult(), 3)}x`,
    ascAscensionTimeAccel: `${format(calculateAscensionSpeedMult(), 3)}x${addedAsterisk ? '*' : ''}`,
    ascSingularityCount: format(player.singularityCount),
    ascSingLen: formatTimeShort(player.singularityCounter),
    ascSingChallengeLen: formatTimeShort(player.singChallengeTimer)
  }
  for (const key in fillers) {
    const dom = DOMCacheGetOrSet(key)
    if (dom.textContent !== fillers[key]) {
      dom.textContent = fillers[key]
    }
    if (key === 'ascSingChallengeLen') {
      if (
        player.singularityChallenges.limitedTime.enabled
        && player.singChallengeTimer > 600 - 20 * player.singularityChallenges.limitedTime.completions
      ) {
        dom.style.color = 'red'
      } else {
        dom.style.color = 'white'
      }
    }
  }
}

const tabColors: Partial<Record<Tabs, string>> = {
  [Tabs.Buildings]: 'yellow',
  [Tabs.Upgrades]: 'yellow',
  [Tabs.Achievements]: 'white',
  [Tabs.Runes]: 'cyan',
  [Tabs.Challenges]: 'plum',
  [Tabs.Research]: 'green',
  [Tabs.AntHill]: 'brown',
  [Tabs.WowCubes]: 'purple',
  [Tabs.Corruption]: 'orange',
  [Tabs.Settings]: 'white',
  [Tabs.Shop]: 'limegreen'
}

export const changeTabColor = () => {
  const tab = DOMCacheGetOrSet('tabBorder')
  const color = tabColors[G.currentTab] ?? 'yellow'

  tab.style.backgroundColor = color
}

class AsyncQueue {
  #items: {
    action: () => Promise<unknown>
    resolve: (value: unknown) => void
    reject: (err: Error) => void
  }[] = []
  #pending = false

  enqueue<T> (action: () => Promise<T>): Promise<T> {
    return new Promise((resolve: (value: unknown) => void, reject) => {
      this.#items.push({ action, resolve, reject })
      this.dequeue()
    }) as Promise<T>
  }

  async dequeue () {
    if (this.#pending) return false

    const item = this.#items.shift()
    if (!item) return false

    try {
      this.#pending = true

      const payload = await item.action()
      item.resolve(payload)
    } catch (e) {
      item.reject(e as Error)
    } finally {
      this.#pending = false
      this.dequeue()
    }

    return true
  }
}

const queue = new AsyncQueue()

export const Confirm = async (text: string) =>
  queue.enqueue(() => {
    const conf = DOMCacheGetOrSet('confirmationBox')
    const confWrap = DOMCacheGetOrSet('confirmWrapper')
    const popup = DOMCacheGetOrSet('confirm')
    const overlay = DOMCacheGetOrSet('transparentBG')
    const ok = DOMCacheGetOrSet('ok_confirm')
    const cancel = DOMCacheGetOrSet('cancel_confirm')

    DOMCacheGetOrSet('alertWrapper').style.display = 'none'
    DOMCacheGetOrSet('promptWrapper').style.display = 'none'

    conf.style.display = 'block'
    confWrap.style.display = 'block'
    overlay.style.display = 'block'
    popup.querySelector('p')!.textContent = text
    popup.focus()

    const p = createDeferredPromise<boolean>()

    // IF you clean up the typing here also clean up PromptCB
    const listener = ({ target }: MouseEvent | { target: HTMLElement }) => {
      const targetEl = target as HTMLButtonElement
      ok.removeEventListener('click', listener)
      cancel.removeEventListener('click', listener)
      popup.removeEventListener('keyup', kbListener)

      conf.style.display = 'none'
      confWrap.style.display = 'none'
      overlay.style.display = 'none'

      p.resolve(targetEl === ok)
    }

    const kbListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        return listener({ target: ok })
      } else if (e.key === 'Escape') {
        return listener({ target: cancel })
      }

      return e.preventDefault()
    }

    ok.addEventListener('click', listener, { once: true })
    cancel.addEventListener('click', listener, { once: true })
    popup.addEventListener('keyup', kbListener)

    return p.promise
  })

export const Alert = (text: string): Promise<void> =>
  queue.enqueue(() => {
    const conf = DOMCacheGetOrSet('confirmationBox')
    const alertWrap = DOMCacheGetOrSet('alertWrapper')
    const overlay = DOMCacheGetOrSet('transparentBG')
    const popup = DOMCacheGetOrSet('alert')
    const ok = DOMCacheGetOrSet('ok_alert')

    DOMCacheGetOrSet('confirmWrapper').style.display = 'none'
    DOMCacheGetOrSet('promptWrapper').style.display = 'none'

    conf.style.display = 'block'
    alertWrap.style.display = 'block'
    overlay.style.display = 'block'
    popup.querySelector('p')!.innerHTML = text
    popup.focus()

    const p = createDeferredPromise<void>()

    const listener = () => {
      ok.removeEventListener('click', listener)
      popup.removeEventListener('keyup', kbListener)

      conf.style.display = 'none'
      alertWrap.style.display = 'none'
      overlay.style.display = 'none'
      p.resolve()
    }

    const kbListener = (e: KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && listener()

    ok.addEventListener('click', listener, { once: true })
    popup.addEventListener('keyup', kbListener)

    return p.promise
  })

export const Prompt = (text: string, defaultValue?: string): Promise<string | null> =>
  queue.enqueue(() => {
    const conf = DOMCacheGetOrSet('confirmationBox')
    const confWrap = DOMCacheGetOrSet('promptWrapper')
    const overlay = DOMCacheGetOrSet('transparentBG')
    const popup = DOMCacheGetOrSet('prompt')
    const ok = DOMCacheGetOrSet('ok_prompt')
    const cancel = DOMCacheGetOrSet('cancel_prompt')

    DOMCacheGetOrSet('alertWrapper').style.display = 'none'
    DOMCacheGetOrSet('confirmWrapper').style.display = 'none'

    conf.style.display = 'block'
    confWrap.style.display = 'block'
    overlay.style.display = 'block'
    popup.querySelector('label')!.textContent = text
    if (defaultValue) {
      popup.querySelector('input')!.placeholder = defaultValue
    }
    popup.querySelector('input')!.focus()

    const p = createDeferredPromise<string | null>()

    // kinda disgusting types but whatever
    const listener = ({ target }: MouseEvent | { target: HTMLElement }) => {
      const targetEl = target as HTMLButtonElement
      const el = targetEl.parentNode!.querySelector('input')!

      ok.removeEventListener('click', listener)
      cancel.removeEventListener('click', listener)
      popup.querySelector('input')!.removeEventListener('keyup', kbListener)

      conf.style.display = 'none'
      confWrap.style.display = 'none'
      overlay.style.display = 'none'

      p.resolve(targetEl.id === ok.id ? el.value || el.placeholder : null)

      el.value = el.textContent = el.placeholder = ''
      popup.querySelector('input')!.blur()
    }

    const kbListener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        return listener({ target: ok })
      } else if (e.key === 'Escape') {
        return listener({ target: cancel })
      }

      return e.preventDefault()
    }

    ok.addEventListener('click', listener, { once: true })
    cancel.addEventListener('click', listener, { once: true })
    popup.querySelector('input')!.addEventListener('keyup', kbListener)

    return p.promise
  })

let closeNotification: number
let closedNotification: number

export const Notification = (text: string, time = 30000): Promise<void> => {
  const notification = DOMCacheGetOrSet('notification')
  const textNode = document.querySelector<HTMLElement>('#notification > p')!
  const x = DOMCacheGetOrSet('notifx')

  textNode.textContent = text
  notification.style.display = 'block'
  notification.classList.remove('slide-out')
  notification.classList.add('slide-in')

  const p = createDeferredPromise<void>()

  const closed = () => {
    notification.style.display = 'none'
    textNode.textContent = ''
    closedNotification = 0
  }

  const close = () => {
    notification.classList.add('slide-out')
    notification.classList.remove('slide-in')

    closeNotification = 0
    x.removeEventListener('click', close)
    closedNotification = +setTimeout(closed, 1000)
    p.resolve()
  }

  x.addEventListener('click', close)

  // Reset the close timer if reopened before closed
  clearTimeout(closeNotification)
  clearTimeout(closedNotification)

  // automatically close out after <time> ms
  closeNotification = +setTimeout(close, time)

  return p.promise
}

export const openChangelog = () => {
  const wrapper = document.getElementById('changelogWrapper')!
  const wrapperBlur = document.getElementById('changelogBlur')!

  if (!wrapper.querySelector('iframe')) {
    const iframe = document.createElement('iframe')
    iframe.src = 'https://changelog.synergism.cc/latest'
    iframe.width = '100%'
    iframe.height = '100%'

    wrapper.appendChild(iframe)
  }

  wrapper.style.display = 'block'
  wrapperBlur.style.display = 'block'
}

export const closeChangelog = () => {
  const wrapper = document.getElementById('changelogWrapper')!
  const wrapperBlur = document.getElementById('changelogBlur')!

  wrapper.style.display = 'none'
  wrapperBlur.style.display = 'none'
}

/**
 * Create a popunder under an element.
 * @example
 * popunder(document.querySelector('.currencyContainer'), () => player.coins);
 * @param el Element to create the popunder under
 * @param v function that returns the value to format
 */
/*const popunder = (
    el: HTMLElement,
    v: () => Parameters<typeof format>[0]
) => {
    const id: 'khafraIsAwesome' = 'khafraIsAwesome' as const; // DO NOT CHANGE!
    el.addEventListener('mouseenter', (ev) => {
        const isOnPage = DOMCacheGetOrSet(id);
        if (isOnPage !== null)
            document.body.removeChild(isOnPage);

        const hover = ev.target as HTMLElement;
        const popunder = document.createElement('div');
        popunder.setAttribute('id', id);
        popunder.textContent =  format(v(), undefined, undefined, false);

        popunder.style.setProperty('position', 'absolute');
        popunder.style.setProperty('text-align', 'center');
        popunder.style.setProperty('height', `${hover.offsetHeight}px`);
        popunder.style.setProperty('width', `${hover.offsetWidth}px`);
        popunder.style.setProperty('top', `${hover.offsetTop + hover.offsetHeight}px`);
        popunder.style.setProperty('left', `${hover.offsetLeft}px`);
        popunder.style.setProperty('background-color', 'red');

        document.body.appendChild(popunder);
    });

    el.addEventListener('mouseleave', () => {
        const isOnPage = DOMCacheGetOrSet(id);
        if (isOnPage !== null)
            document.body.removeChild(isOnPage);
    });
}

Object.defineProperty(window, 'popunder', { value: popunder });*/
