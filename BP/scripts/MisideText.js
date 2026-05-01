import {
  CommandPermissionLevel,
  CustomCommandParamType,
  CustomCommandStatus,
  system,
  world
} from "@minecraft/server";

/**
 * @typedef {{ red: number, green: number, blue: number }} MisideTextColor
 * @typedef {{ text: string, color?: MisideTextColor }} MisideTextSegment
 * @typedef {{ segments: MisideTextSegment[] }} MisideTextContent
 */

const DEFAULT_TEXT = "ABC";
const DEFAULT_HOLD_DURATION = 2;
const DEFAULT_REST_DURATION = 4.5;
const DEFAULT_FADE_OUT_DURATION = 1;
const DEFAULT_SCALE = 1;
const DEFAULT_USE_ROTATION = true;
const DEFAULT_DEPTH_TEST = true;
const DEFAULT_BACKFACE_VISIBLE = true;
const DEFAULT_GLOW = false;
const DEFAULT_RENDERER = "atlas";
const SUBTITLE_FAMILY = "miside_subtitle";
const CLEANUP_DIMENSIONS = [
  "minecraft:overworld",
  "minecraft:nether",
  "minecraft:the_end"
];
const GLYPH_BATCH_ENTITY_TYPE = "miside:font_glyph_batch_16";
const GLYPH_BATCH_UPDATE_ANIMATION = "animation.miside_letter_batch_16.update";
const GLYPH_BATCH_SLOT_COUNT = 16;
const SLOT_RANDOM_SCALAR_COUNT = 9;
const GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE = 4;
const GLYPH_BATCH_DROP_COLLISION_CHUNK_SIZE = 32;
const GLYPH_ADVANCE = 0.736;
const FALLBACK_GLYPH_CODE_POINT = 0x003F;
const SHARD_LINE_SPACING = 0.552;
const GLYPH_BATCH_COLLISION_FIELD_RADIUS = 12;
const GLYPH_BATCH_COLLISION_FIELD_SIZE = (GLYPH_BATCH_COLLISION_FIELD_RADIUS * 2) + 1;
const GLYPH_BATCH_COLLISION_HORIZONTAL_MARGIN = 2.25;
const GLYPH_BATCH_COLLISION_SCAN_TOP_MARGIN = 2;
const GLYPH_BATCH_COLLISION_SCAN_BOTTOM_MARGIN = 64;
const MAIN_CHAR_INTERVAL = 4;
const MAIN_CHAR_POP_TICKS = 8;
const MAIN_FLOAT_Y_OFFSET = 0.12;
const MAIN_BOB_SPEED = 0.08;
const MAIN_BOB_AMPLITUDE = 0.008;
const SHARD_GRAVITY_STEP = 0.018;
const SHARD_PHYSICS_SUBSTEPS = 2;
const SHARD_PHYSICS_SUBSTEP_SCALE = 0.5;
const SHARD_VELOCITY_DRAG = 0.994;
const SHARD_FAILSAFE_TICKS = 420;
const MAX_DROP_TICK_SIMULATION_TICKS = 4096;
const POST_DROP_CLEANUP_MARGIN_TICKS = 8;
const SUBTITLE_ENTITY_SWEEP_INTERVAL = 80;
const SUBTITLE_STARTUP_SWEEP_DELAYS = Object.freeze([0, 20, 100]);
const SUBTITLE_REENTRY_SWEEP_DELAYS = Object.freeze([1, 20, 100]);
const SUBTITLE_PLAYERLESS_CHECK_INTERVAL = 20;
const SUBTITLE_PLAYERLESS_FINAL_CONFIRM_TICKS = 1;
const SUBTITLE_PLAYERLESS_CULL_DISTANCE = 64;
const SUBTITLE_PLAYERLESS_CULL_DISTANCE_SQ =
  SUBTITLE_PLAYERLESS_CULL_DISTANCE * SUBTITLE_PLAYERLESS_CULL_DISTANCE;
const SUBTITLE_DISTANCE = 2;
const SUBTITLE_DROP = 0.3;
const STOP_EXPRESSION_FALSE = 0.31415926;
const GROUND_SCAN_UP = 1;
const SUPPORT_SAMPLE_HALF_SIZE = 0.18;
const COLLISION_CODE_EMPTY = 0;
const COLLISION_CODE_FULL = 1;
const COLLISION_CODE_SLAB_BOTTOM = 2;
const COLLISION_CODE_TRAPDOOR_BOTTOM = 3;
const COLLISION_CODE_CARPET = 4;
const COLLISION_CODE_PRESSURE_PLATE = 5;
const COLLISION_CODE_PATH = 6;
const COLLISION_CODE_SNOW_BASE = 16;
const COLLISION_CODE_STAIR_BASE = 32;
const COLLISION_STAIR_SHAPE_COUNT = 5;
const SUBTITLE_VISIBLE_PROPERTY = "miside:subtitle_visible";
const SUBTITLE_VISIBLE_FALSE = 0;
const SUBTITLE_VISIBLE_TRUE = 1;
const SUBTITLE_RUNTIME_TAG_PREFIX = "ms_rt_";
const SUBTITLE_OWNER_TAG_PREFIX = "ms_tx_";
const SUBTITLE_BATCH_TAG_PREFIX = "ms_b_";
const SUBTITLE_RUNTIME_SESSION_ID = createSubtitleRuntimeSessionId();
const SUBTITLE_RUNTIME_TAG = `${SUBTITLE_RUNTIME_TAG_PREFIX}${SUBTITLE_RUNTIME_SESSION_ID}`;
const LOCALIZATION_KEYS = Object.freeze({
  command: Object.freeze({
    description: "misidetext.command.description",
    success: "misidetext.command.success",
    failureContext: "misidetext.command.failure.context",
    failureTimings: "misidetext.command.failure.timings",
    failureRenderFlags: "misidetext.command.failure.render_flags",
    failureNonNegative: "misidetext.command.failure.non_negative"
  }),
  parameter: Object.freeze({
    timings: "misidetext.parameter.timings",
    renderFlags: "misidetext.parameter.render_flags"
  }),
  error: Object.freeze({
    dimensionRequired: "misidetext.error.dimension_required",
    invalidPlayer: "misidetext.error.invalid_player",
    visibleToArray: "misidetext.error.visible_to_array",
    visibleToPlayerInstances: "misidetext.error.visible_to_player_instances",
    textType: "misidetext.error.text_type",
    contentSegmentsOnly: "misidetext.error.content_segments_only",
    contentSegmentsArray: "misidetext.error.content_segments_array",
    contentSegmentEntry: "misidetext.error.content_segment_entry",
    colorObject: "misidetext.error.color_object",
    colorChannelRange: "misidetext.error.color_channel_range"
  })
});
const DEFAULT_TEXT_COLOR = Object.freeze({
  red: 255,
  green: 255,
  blue: 255
});
const BEDROCK_TEXT_COLORS = Object.freeze({
  "0": Object.freeze({ red: 0, green: 0, blue: 0 }),
  "1": Object.freeze({ red: 0, green: 0, blue: 170 }),
  "2": Object.freeze({ red: 0, green: 170, blue: 0 }),
  "3": Object.freeze({ red: 0, green: 170, blue: 170 }),
  "4": Object.freeze({ red: 170, green: 0, blue: 0 }),
  "5": Object.freeze({ red: 170, green: 0, blue: 170 }),
  "6": Object.freeze({ red: 255, green: 170, blue: 0 }),
  "7": Object.freeze({ red: 170, green: 170, blue: 170 }),
  "8": Object.freeze({ red: 85, green: 85, blue: 85 }),
  "9": Object.freeze({ red: 85, green: 85, blue: 255 }),
  a: Object.freeze({ red: 85, green: 255, blue: 85 }),
  b: Object.freeze({ red: 85, green: 255, blue: 255 }),
  c: Object.freeze({ red: 255, green: 85, blue: 85 }),
  d: Object.freeze({ red: 255, green: 85, blue: 255 }),
  e: Object.freeze({ red: 255, green: 255, blue: 85 }),
  f: Object.freeze({ red: 255, green: 255, blue: 255 }),
  g: Object.freeze({ red: 221, green: 214, blue: 5 }),
  h: Object.freeze({ red: 227, green: 212, blue: 209 }),
  i: Object.freeze({ red: 206, green: 202, blue: 202 }),
  j: Object.freeze({ red: 68, green: 58, blue: 59 }),
  m: Object.freeze({ red: 151, green: 22, blue: 7 }),
  n: Object.freeze({ red: 180, green: 104, blue: 77 }),
  p: Object.freeze({ red: 222, green: 177, blue: 45 }),
  q: Object.freeze({ red: 71, green: 160, blue: 54 }),
  s: Object.freeze({ red: 44, green: 186, blue: 168 }),
  t: Object.freeze({ red: 33, green: 73, blue: 123 }),
  u: Object.freeze({ red: 154, green: 92, blue: 198 })
});
const BEDROCK_TEXT_EFFECT_CODES = new Set(["k", "l", "o", "v", "w", "x", "y", "z"]);

const activeTexts = new Map();
const pendingSubtitleEntityIds = new Set();
let hadOnlinePlayers = false;
let nextTextId = 1;
let commandInstalled = false;
let subtitleSweepQueued = false;
let lastSafePlayersQueryFailed = false;

system.run(() => {
  scheduleSubtitleEntitySweeps(SUBTITLE_STARTUP_SWEEP_DELAYS);
});

system.runInterval(() => {
  const hasOnlinePlayers = getSafePlayers().length > 0;
  if (hasOnlinePlayers && !hadOnlinePlayers) {
    scheduleSubtitleEntitySweeps(SUBTITLE_REENTRY_SWEEP_DELAYS);
  }
  hadOnlinePlayers = hasOnlinePlayers;

  for (const [textId, text] of activeTexts) {
    if (!text._tick()) {
      activeTexts.delete(textId);
    }
  }
}, 1);

system.runInterval(() => {
  sweepSubtitleEntities();
}, SUBTITLE_ENTITY_SWEEP_INTERVAL);

world.afterEvents.playerSpawn?.subscribe((event) => {
  syncSubtitleVisibilityForPlayer(event.player);
});

world.afterEvents.entityLoad?.subscribe((event) => {
  validateLoadedSubtitleEntity(event.entity);
});

export class MisideText {
  constructor(locationOrOptions = zeroVec(), text = DEFAULT_TEXT, options = {}) {
    const config = normalizeConstructorOptions(locationOrOptions, text, options);
    this.id = `miside_text_${nextTextId++}`;
    this._renderer = DEFAULT_RENDERER;
    this._text = normalizeSubtitleTextInput(config.text, DEFAULT_TEXT);
    this._location = normalizeLocation(config.location);
    this._rotation = normalizeRotation(config.rotation);
    this._basisDirection = normalizeOptionalDirection(config.basisDirection);
    this._scale = normalizeScale(config.scale);
    this._letterSpacing = normalizeNonNegativeNumber(config.letterSpacing, GLYPH_ADVANCE);
    this._lineSpacing = normalizeNonNegativeNumber(config.lineSpacing, SHARD_LINE_SPACING);
    this._useRotation = normalizeUseRotation(config.useRotation);
    this._depthTest = normalizeDepthTest(config.depthTest);
    this._backfaceVisible = normalizeBackfaceVisible(config.backfaceVisible);
    this._glow = normalizeGlow(config.glow);
    this._fadeInDuration = normalizeOptionalDuration(config.fadeInDuration);
    this._holdDuration = normalizeDuration(config.holdDuration, DEFAULT_HOLD_DURATION);
    this._restDuration = normalizeDuration(config.restDuration, DEFAULT_REST_DURATION);
    this._fadeOutDuration = normalizeDuration(config.fadeOutDuration, DEFAULT_FADE_OUT_DURATION);
    this._visibleToPlayerIds = normalizeVisibleToPlayerIds(config.visibleTo);
    this._attachedTo = config.attachedTo ?? null;
    this._dimension = config.dimension ?? config.attachedTo?.dimension ?? null;
    this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
    this._pendingSweepRemoval = false;
    this._valid = true;
    this._effect = createEmptyEffectState();

    if (!this._dimension) {
      throw createLocalizedError(LOCALIZATION_KEYS.error.dimensionRequired);
    }

    if (!this._spawn()) {
      this._valid = false;
      return;
    }

    activeTexts.set(this.id, this);
    clearPendingSubtitleEntityIds(this._effect.renderBatches);
    this._applyVisibilityOverrides();
  }

  static setSubtitle(player, text = DEFAULT_TEXT, options = {}) {
    if (!player?.isValid) {
      throw createLocalizedError(LOCALIZATION_KEYS.error.invalidPlayer);
    }

    const distance = normalizePositiveNumber(options.distance, SUBTITLE_DISTANCE);
    const drop = normalizeNumber(options.drop, SUBTITLE_DROP);
    const direction = normalizeOptionalDirection(player.getViewDirection()) ??
      normalizeLocation(player.getViewDirection());
    const keepsPlayerFacingBasis = !hasRotationFacingOverride(options.rotation);
    const baseRotation = normalizeRotation({
      x: player.getRotation().x,
      y: player.getRotation().y,
      z: 0,
      ...(options.rotation ?? {})
    });
    const location = normalizeLocation(
      options.location ?? addVec(
        addVec(player.getHeadLocation(), scaleVec(direction, distance)),
        { x: 0, y: -drop, z: 0 }
      )
    );

    return new MisideText(location, text, {
      ...options,
      dimension: options.dimension ?? player.dimension,
      location,
      rotation: baseRotation,
      basisDirection: keepsPlayerFacingBasis ? direction : null
    });
  }

  get text() {
    return cloneSubtitleTextInput(this._text);
  }

  get location() {
    return cloneVec(this._location);
  }

  get rotation() {
    return cloneRotation(this._rotation);
  }

  set rotation(value) {
    this.setRotation(value);
  }

  get scale() {
    return this._scale;
  }

  set scale(value) {
    this.setScale(value);
  }

  get letterSpacing() {
    return this._letterSpacing;
  }

  set letterSpacing(value) {
    this.setLetterSpacing(value);
  }

  get lineSpacing() {
    return this._lineSpacing;
  }

  set lineSpacing(value) {
    this.setLineSpacing(value);
  }

  get useRotation() {
    return this._useRotation;
  }

  set useRotation(value) {
    this.setUseRotation(value);
  }

  get depthTest() {
    return this._depthTest;
  }

  set depthTest(value) {
    this.setDepthTest(value);
  }

  get backfaceVisible() {
    return this._backfaceVisible;
  }

  set backfaceVisible(value) {
    this.setBackfaceVisible(value);
  }

  get glow() {
    return this._glow;
  }

  set glow(value) {
    this.setGlow(value);
  }

  get fadeInDuration() {
    return resolveFadeInDurationSeconds(
      countSubtitleSlots(this._text),
      this._fadeInDuration
    );
  }

  set fadeInDuration(value) {
    this.setFadeInDuration(value);
  }

  get holdDuration() {
    return this._holdDuration;
  }

  set holdDuration(value) {
    this.setHoldDuration(value);
  }

  get restDuration() {
    return this._restDuration;
  }

  set restDuration(value) {
    this.setRestDuration(value);
  }

  get fadeOutDuration() {
    return this._fadeOutDuration;
  }

  set fadeOutDuration(value) {
    this.setFadeOutDuration(value);
  }

  get dimension() {
    return this._getResolvedDimension();
  }

  get visibleTo() {
    return resolveVisibleToPlayers(this._visibleToPlayerIds);
  }

  set visibleTo(value) {
    this.setVisibleTo(value);
  }

  get attachedTo() {
    return this._attachedTo;
  }

  set attachedTo(value) {
    this.setAttachedTo(value);
  }

  get renderer() {
    return this._renderer;
  }

  isValid() {
    return this._valid;
  }

  remove() {
    if (!this._valid) {
      return;
    }

    activeTexts.delete(this.id);
    this._despawnLetters();
    this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
    this._pendingSweepRemoval = false;
    this._effect = createEmptyEffectState();
    this._valid = false;
  }

  setText(text) {
    if (!this._valid) {
      return this;
    }

    this._text = normalizeSubtitleTextInput(text, DEFAULT_TEXT);
    this._respawn();
    return this;
  }

  setLocation(location) {
    if (!this._valid) {
      return this;
    }

    const nextDimension = location?.dimension ?? this._dimension;
    this._location = normalizeLocation(location);
    if (nextDimension && nextDimension !== this._dimension) {
      this._dimension = nextDimension;
      this._respawn();
    }
    return this;
  }

  setRotation(rotation) {
    if (!this._valid) {
      return this;
    }

    this._rotation = normalizeRotation(rotation);
    this._basisDirection = null;
    return this;
  }

  setScale(scale) {
    if (!this._valid) {
      return this;
    }

    this._scale = normalizeScale(scale);
    return this;
  }

  setLetterSpacing(letterSpacing) {
    if (!this._valid) {
      return this;
    }

    const nextLetterSpacing = normalizeNonNegativeNumber(letterSpacing, GLYPH_ADVANCE);
    if (this._letterSpacing === nextLetterSpacing) {
      return this;
    }

    this._letterSpacing = nextLetterSpacing;
    this._respawn();
    return this;
  }

  setLineSpacing(lineSpacing) {
    if (!this._valid) {
      return this;
    }

    const nextLineSpacing = normalizeNonNegativeNumber(lineSpacing, SHARD_LINE_SPACING);
    if (this._lineSpacing === nextLineSpacing) {
      return this;
    }

    this._lineSpacing = nextLineSpacing;
    this._respawn();
    return this;
  }

  setUseRotation(useRotation) {
    if (!this._valid) {
      return this;
    }

    this._useRotation = normalizeUseRotation(useRotation);
    return this;
  }

  setDepthTest(depthTest) {
    if (!this._valid) {
      return this;
    }

    this._depthTest = normalizeDepthTest(depthTest);
    return this;
  }

  setBackfaceVisible(backfaceVisible) {
    if (!this._valid) {
      return this;
    }

    this._backfaceVisible = normalizeBackfaceVisible(backfaceVisible);
    return this;
  }

  setGlow(glow) {
    if (!this._valid) {
      return this;
    }

    this._glow = normalizeGlow(glow);
    return this;
  }

  setFadeInDuration(fadeInDuration) {
    if (!this._valid) {
      return this;
    }

    this._fadeInDuration = normalizeOptionalDuration(fadeInDuration);
    return this;
  }

  setHoldDuration(holdDuration) {
    if (!this._valid) {
      return this;
    }

    this._holdDuration = normalizeDuration(holdDuration, DEFAULT_HOLD_DURATION);
    return this;
  }

  setRestDuration(restDuration) {
    if (!this._valid) {
      return this;
    }

    this._restDuration = normalizeDuration(restDuration, DEFAULT_REST_DURATION);
    return this;
  }

  setFadeOutDuration(fadeOutDuration) {
    if (!this._valid) {
      return this;
    }

    this._fadeOutDuration = normalizeDuration(fadeOutDuration, DEFAULT_FADE_OUT_DURATION);
    return this;
  }

  setVisibleTo(visibleTo) {
    if (!this._valid) {
      return this;
    }

    const nextVisibleToPlayerIds = normalizeVisibleToPlayerIds(visibleTo);
    if (arePlayerIdArraysEqual(this._visibleToPlayerIds, nextVisibleToPlayerIds)) {
      return this;
    }

    this._visibleToPlayerIds = nextVisibleToPlayerIds;
    this._applyVisibilityOverrides();
    return this;
  }

  setAttachedTo(attachedTo) {
    if (!this._valid) {
      return this;
    }

    const nextDimension = attachedTo?.dimension ?? this._dimension;
    const shouldRespawn = !!attachedTo && nextDimension !== this._dimension;
    this._attachedTo = attachedTo ?? null;
    if (attachedTo?.dimension) {
      this._dimension = attachedTo.dimension;
    }
    if (shouldRespawn) {
      this._respawn();
    }
    return this;
  }

  _tick() {
    if (!this._valid) {
      return false;
    }

    if (this._attachedTo && !this._attachedTo.isValid) {
      this._location = cloneVec(this._effect.anchor);
      this._attachedTo = null;
    }

    const resolvedDimension = this._getResolvedDimension();
    if (!resolvedDimension) {
      this.remove();
      return false;
    }

    if (resolvedDimension !== this._effect.dimension) {
      this._dimension = resolvedDimension;
      this._respawn();
      return this._valid && this._effect.renderBatches.length > 0;
    }

    const effect = this._effect;
    effect.tick += 1;
    effect.dimension = resolvedDimension;
    applyEffectStageTimings(effect, effect.totalSlots, {
      fadeInDuration: this._fadeInDuration,
      holdDuration: this._holdDuration,
      restDuration: this._restDuration,
      fadeOutDuration: this._fadeOutDuration
    });
    if (effect.dropStarted) {
      effect.cleanupTick = getDropCleanupTick(effect);
    }

    if (!effect.dropStarted) {
      effect.scale = this._scale;
      effect.useRotation = this._useRotation;
      effect.depthTest = this._depthTest;
      effect.backfaceVisible = this._backfaceVisible;
      effect.glow = this._glow;
      effect.baseRotation = toBaseRotation(this._rotation);
      effect.basis = this._resolveBasis(effect.baseRotation);

      const nextAnchor = this._resolveAnchor(effect.anchor);
      if (this._shouldStartDrop(effect)) {
        this._startDrop(effect, nextAnchor);
      }

      effect.anchor = this._attachedTo ? nextAnchor : cloneVec(this._location);
    }

    if (!this._updatePlayerlessSweepRemoval(effect)) {
      return false;
    }

    const aliveCount = syncAtlasRenderBatches(effect);
    if (aliveCount > 0) {
      return true;
    }

    this._valid = false;
    return false;
  }

  _spawn() {
    const dimension = this._getResolvedDimension();
    if (!dimension) {
      return false;
    }

    this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
    this._pendingSweepRemoval = false;

    const { descriptors, totalSlots } = buildLetterDescriptors(
      this._text,
      this._letterSpacing,
      this._lineSpacing
    );
    if (!descriptors.length || totalSlots === 0) {
      return false;
    }

    const anchor = this._resolveAnchor();
    const baseRotation = toBaseRotation(this._rotation);
    const basis = this._resolveBasis(baseRotation);
    const stageTimings = resolveStageTimings(totalSlots, {
      fadeInDuration: this._fadeInDuration,
      holdDuration: this._holdDuration,
      restDuration: this._restDuration,
      fadeOutDuration: this._fadeOutDuration
    });
    const spawnResult = spawnAtlasBatchLetters(dimension, descriptors, anchor, this.id);
    const renderBatches = spawnResult?.renderBatches ?? [];

    if (!renderBatches.length) {
      return false;
    }

    this._effect = {
      tick: 0,
      fadeInTicks: stageTimings.fadeInTicks,
      fadeInCharIntervalTicks: stageTimings.fadeInCharIntervalTicks,
      fadeInCharPopTicks: stageTimings.fadeInCharPopTicks,
      holdTicks: stageTimings.holdTicks,
      restTicks: stageTimings.restTicks,
      fadeOutTicks: stageTimings.fadeOutTicks,
      cleanupTick: Number.POSITIVE_INFINITY,
      dropStartTick: Number.POSITIVE_INFINITY,
      dimension,
      anchor,
      basis,
      baseRotation,
      totalSlots,
      scale: this._scale,
      useRotation: this._useRotation,
      depthTest: this._depthTest,
      backfaceVisible: this._backfaceVisible,
      glow: this._glow,
      setupSig: 1,
      dropSig: 0,
      dropStarted: false,
      renderBatches
    };

    syncAtlasRenderBatches(this._effect);
    return true;
  }

  _respawn() {
    if (!this._valid) {
      return;
    }

    activeTexts.delete(this.id);
    this._despawnLetters();
    if (!this._spawn()) {
      this._effect = createEmptyEffectState();
      this._valid = false;
      return;
    }

    activeTexts.set(this.id, this);
    clearPendingSubtitleEntityIds(this._effect.renderBatches);
    this._applyVisibilityOverrides();
  }

  _despawnLetters() {
    for (const renderBatch of this._effect.renderBatches ?? []) {
      removeEntity(world.getEntity(renderBatch.entityId));
    }

    cleanupLoadedSubtitleEntitiesByOwner(this.id);
  }

  _getResolvedDimension() {
    return this._attachedTo?.dimension ?? this._dimension ?? null;
  }

  _resolveAnchor(fallback = null) {
    if (this._attachedTo?.isValid) {
      return addVec(this._attachedTo.location, this._location);
    }

    if (fallback) {
      return cloneVec(this._location ?? fallback);
    }

    return cloneVec(this._location);
  }

  _shouldStartDrop(effect) {
    if (effect.dropStarted) {
      return false;
    }

    const dropStart = getMainDropStartTick(effect.fadeInTicks, effect.holdTicks);
    return effect.tick - 1 >= dropStart;
  }

  _startDrop(effect, frozenAnchor) {
    this._location = cloneVec(frozenAnchor);
    this._attachedTo = null;
    effect.dropStarted = true;
    effect.dropSig = 1;
    effect.dropStartTick = effect.tick;
    prepareBatchDropCollision(effect, frozenAnchor);
    effect.cleanupTick = getDropCleanupTick(effect);
  }

  _updatePlayerlessSweepRemoval(effect) {
    if (!this._valid) {
      return false;
    }

    if (this._pendingSweepRemoval) {
      if (effect.tick % SUBTITLE_PLAYERLESS_CHECK_INTERVAL !== 0) {
        return true;
      }

      if (this._hasNearbyRetainingPlayer(effect.anchor, effect.dimension)) {
        this._pendingSweepRemoval = false;
        this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
      }
      return true;
    }

    if (
      Number.isFinite(this._playerlessCullConfirmTick) &&
      effect.tick >= this._playerlessCullConfirmTick
    ) {
      this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
      if (!this._hasNearbyRetainingPlayer(effect.anchor, effect.dimension)) {
        this._markForSweepRemoval();
        return true;
      }
    }

    if (effect.tick % SUBTITLE_PLAYERLESS_CHECK_INTERVAL !== 0) {
      return true;
    }

    if (this._hasNearbyRetainingPlayer(effect.anchor, effect.dimension)) {
      this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
      return true;
    }

    this._playerlessCullConfirmTick =
      effect.tick + SUBTITLE_PLAYERLESS_FINAL_CONFIRM_TICKS;
    return true;
  }

  _hasNearbyRetainingPlayer(anchor, dimension) {
    if (!anchor || !dimension) {
      return false;
    }

    const players = getSafePlayers();
    if (lastSafePlayersQueryFailed) {
      return true;
    }

    for (const player of players) {
      if (!player?.isValid || player.dimension !== dimension) {
        continue;
      }

      const dx = player.location.x - anchor.x;
      const dz = player.location.z - anchor.z;
      if ((dx * dx) + (dz * dz) <= SUBTITLE_PLAYERLESS_CULL_DISTANCE_SQ) {
        return true;
      }
    }

    return false;
  }

  _markForSweepRemoval() {
    if (!this._valid || this._pendingSweepRemoval) {
      return;
    }

    this._pendingSweepRemoval = true;
    this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
    queueSubtitleEntitySweep();
  }

  _finalizeSweepRemoval() {
    if (!this._valid) {
      return;
    }

    activeTexts.delete(this.id);
    this._attachedTo = null;
    this._pendingSweepRemoval = false;
    this._playerlessCullConfirmTick = Number.POSITIVE_INFINITY;
    this._effect = createEmptyEffectState();
    this._valid = false;
  }

  _resolveBasis(baseRotation) {
    if (this._basisDirection && lengthSq(this._basisDirection) >= 0.000001) {
      return buildBasisFromDirection(this._basisDirection, baseRotation);
    }

    return buildBasisFromRotation(baseRotation);
  }

  _applyVisibilityOverrides(players = null, entities = null) {
    applySubtitleVisibilityOverrides(this, players, entities);
  }
}

function installMisideTextCommand() {
  if (commandInstalled) {
    return;
  }

  commandInstalled = true;
  system.beforeEvents.startup.subscribe((initEvent) => {
    const commandRegistry = initEvent.customCommandRegistry;
    const locationParamType = CustomCommandParamType?.Position ?? CustomCommandParamType?.Location;
    if (!commandRegistry || !locationParamType) {
      return;
    }

    commandRegistry.registerCommand({
      name: "miside:text",
      description: LOCALIZATION_KEYS.command.description,
      permissionLevel: CommandPermissionLevel.Any,
      cheatsRequired: false,
      mandatoryParameters: [
        { name: "text", type: CustomCommandParamType.String }
      ],
      optionalParameters: [
        { name: "timings", type: CustomCommandParamType.String },
        { name: "scale", type: CustomCommandParamType.Float },
        { name: "location", type: locationParamType },
        { name: "pitch", type: CustomCommandParamType.Float },
        { name: "yaw", type: CustomCommandParamType.Float },
        { name: "roll", type: CustomCommandParamType.Float },
        { name: "renderFlags", type: CustomCommandParamType.String }
      ]
    }, handleMisideTextCommand);
  });
}

function scheduleSubtitleEntitySweeps(delays) {
  for (const delay of delays ?? []) {
    system.runTimeout(() => {
      sweepSubtitleEntities();
    }, Math.max(0, Math.floor(delay)));
  }
}

function queueSubtitleEntitySweep() {
  if (subtitleSweepQueued) {
    return;
  }

  subtitleSweepQueued = true;
  system.run(() => {
    subtitleSweepQueued = false;
    sweepSubtitleEntities();
  });
}

function sweepSubtitleEntities() {
  for (const dimensionId of CLEANUP_DIMENSIONS) {
    const dimension = tryGetDimension(dimensionId);
    if (!dimension) {
      continue;
    }

    const entities = dimension.getEntities({
      families: [SUBTITLE_FAMILY]
    });

    for (const entity of entities) {
      validateTrackedSubtitleEntity(entity);
    }
  }
}

function validateLoadedSubtitleEntity(entity) {
  if (!entity?.isValid || entity.typeId !== GLYPH_BATCH_ENTITY_TYPE) {
    return;
  }

  const tags = getSafeEntityTags(entity);
  if (!hasSubtitleIdentityTags(tags)) {
    return;
  }

  if (!validateTrackedSubtitleEntity(entity, tags)) {
    return;
  }

  const ownerText = findTrackedSubtitleOwnerText(entity, tags);
  if (ownerText) {
    ownerText._applyVisibilityOverrides(null, [entity]);
  }
}

function validateTrackedSubtitleEntity(entity, tags = null) {
  if (!entity?.isValid) {
    return false;
  }

  if (entity.typeId !== GLYPH_BATCH_ENTITY_TYPE) {
    return true;
  }

  const resolvedTags = Array.isArray(tags) ? tags : getSafeEntityTags(entity);
  const runtimeTag = findEntityTagWithPrefix(resolvedTags, SUBTITLE_RUNTIME_TAG_PREFIX);
  const ownerTag = findEntityTagWithPrefix(resolvedTags, SUBTITLE_OWNER_TAG_PREFIX);
  if (runtimeTag !== SUBTITLE_RUNTIME_TAG || !ownerTag) {
    removeEntity(entity);
    return false;
  }

  const ownerId = ownerTag.slice(SUBTITLE_OWNER_TAG_PREFIX.length);
  if (pendingSubtitleEntityIds.has(entity.id)) {
    return true;
  }

  const ownerText = activeTexts.get(ownerId);
  if (ownerText?._pendingSweepRemoval) {
    if (ownerText._hasNearbyRetainingPlayer(ownerText._effect.anchor, ownerText._effect.dimension)) {
      ownerText._pendingSweepRemoval = false;
      return true;
    }

    ownerText._finalizeSweepRemoval();
    removeEntity(entity);
    return false;
  }

  if (!ownerText || !isTrackedSubtitleBatchEntity(ownerText, entity.id)) {
    removeEntity(entity);
    return false;
  }

  return true;
}

function cleanupLoadedSubtitleEntitiesByOwner(ownerId) {
  if (!ownerId) {
    return;
  }

  const ownerTag = createSubtitleOwnerTag(ownerId);
  for (const dimensionId of CLEANUP_DIMENSIONS) {
    const dimension = tryGetDimension(dimensionId);
    if (!dimension) {
      continue;
    }

    const entities = dimension.getEntities({
      tags: [ownerTag]
    });
    for (const entity of entities) {
      if (entity?.typeId === GLYPH_BATCH_ENTITY_TYPE) {
        removeEntity(entity);
      }
    }
  }
}

function findTrackedSubtitleOwnerText(entity, tags = null) {
  if (!entity?.isValid || entity.typeId !== GLYPH_BATCH_ENTITY_TYPE) {
    return null;
  }

  if (pendingSubtitleEntityIds.has(entity.id)) {
    return null;
  }

  const resolvedTags = Array.isArray(tags) ? tags : getSafeEntityTags(entity);
  const ownerTag = findEntityTagWithPrefix(resolvedTags, SUBTITLE_OWNER_TAG_PREFIX);
  if (!ownerTag) {
    return null;
  }

  const ownerId = ownerTag.slice(SUBTITLE_OWNER_TAG_PREFIX.length);
  const ownerText = activeTexts.get(ownerId);
  return ownerText && isTrackedSubtitleBatchEntity(ownerText, entity.id)
    ? ownerText
    : null;
}

function applySubtitleEntityIdentityTags(entity, ownerId, batchIndex) {
  try {
    entity.addTag(SUBTITLE_RUNTIME_TAG);
    entity.addTag(createSubtitleOwnerTag(ownerId));
    entity.addTag(createSubtitleBatchTag(batchIndex));
    pendingSubtitleEntityIds.add(entity.id);
    return true;
  } catch {
    pendingSubtitleEntityIds.delete(entity?.id);
    return false;
  }
}

function clearPendingSubtitleEntityIds(renderBatches) {
  for (const renderBatch of renderBatches ?? []) {
    pendingSubtitleEntityIds.delete(renderBatch.entityId);
  }
}

function isTrackedSubtitleBatchEntity(text, entityId) {
  for (const renderBatch of text?._effect?.renderBatches ?? []) {
    if (renderBatch.entityId === entityId) {
      return true;
    }
  }

  return false;
}

function hasSubtitleIdentityTags(tags) {
  return !!findEntityTagWithPrefix(tags, SUBTITLE_RUNTIME_TAG_PREFIX) ||
    !!findEntityTagWithPrefix(tags, SUBTITLE_OWNER_TAG_PREFIX) ||
    !!findEntityTagWithPrefix(tags, SUBTITLE_BATCH_TAG_PREFIX);
}

function getSafeEntityTags(entity) {
  try {
    return entity?.isValid ? entity.getTags() : [];
  } catch {
    return [];
  }
}

function findEntityTagWithPrefix(tags, prefix) {
  for (const tag of tags ?? []) {
    if (typeof tag === "string" && tag.startsWith(prefix)) {
      return tag;
    }
  }

  return null;
}

function createSubtitleOwnerTag(ownerId) {
  return `${SUBTITLE_OWNER_TAG_PREFIX}${ownerId}`;
}

function createSubtitleBatchTag(batchIndex) {
  return `${SUBTITLE_BATCH_TAG_PREFIX}${Math.max(0, Math.trunc(batchIndex))}`;
}

function createSubtitleRuntimeSessionId() {
  const timestamp = Date.now().toString(36);
  const random = Math.floor(Math.random() * 1679616).toString(36).padStart(4, "0");
  return `${timestamp}${random}`;
}

function tryGetDimension(dimensionId) {
  try {
    return world.getDimension(dimensionId);
  } catch {
    return null;
  }
}

function normalizeVisibleToPlayerIds(visibleTo) {
  if (visibleTo == null) {
    return [];
  }

  if (!Array.isArray(visibleTo)) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.visibleToArray);
  }

  const uniquePlayerIds = [];
  const seenPlayerIds = new Set();
  for (const player of visibleTo) {
    const playerId = typeof player?.id === "string" ? player.id : null;
    const isPlayerLike = typeof player?.setPropertyOverrideForEntity === "function";
    if (!playerId || !isPlayerLike) {
      throw createLocalizedError(LOCALIZATION_KEYS.error.visibleToPlayerInstances);
    }

    if (seenPlayerIds.has(playerId)) {
      continue;
    }

    seenPlayerIds.add(playerId);
    uniquePlayerIds.push(playerId);
  }

  return uniquePlayerIds;
}

function resolveVisibleToPlayers(playerIds) {
  if (!Array.isArray(playerIds) || playerIds.length === 0) {
    return [];
  }

  const playersById = new Map(
    getSafePlayers()
      .filter((player) => player?.isValid && typeof player.id === "string")
      .map((player) => [player.id, player])
  );

  const visiblePlayers = [];
  for (const playerId of playerIds) {
    const player = playersById.get(playerId);
    if (player) {
      visiblePlayers.push(player);
    }
  }

  return visiblePlayers;
}

function arePlayerIdArraysEqual(left, right) {
  if (left === right) {
    return true;
  }

  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
    return false;
  }

  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
}

function syncSubtitleVisibilityForPlayer(player) {
  if (!player?.isValid) {
    return;
  }

  for (const text of activeTexts.values()) {
    text._applyVisibilityOverrides([player]);
  }
}

function applySubtitleVisibilityOverrides(text, players = null, entities = null) {
  if (!text?._valid) {
    return;
  }

  const playerList = Array.isArray(players)
    ? players.filter((player) => player?.isValid)
    : getSafePlayers().filter((player) => player?.isValid);
  if (playerList.length === 0) {
    return;
  }

  const entityList = Array.isArray(entities)
    ? entities.filter((entity) => entity?.isValid && entity.typeId === GLYPH_BATCH_ENTITY_TYPE)
    : resolveTextRenderBatchEntities(text);
  if (entityList.length === 0) {
    return;
  }

  const visibleToPlayerIds = new Set(text._visibleToPlayerIds ?? []);
  const isVisibleToAllPlayers = visibleToPlayerIds.size === 0;
  for (const player of playerList) {
    const shouldShow = isVisibleToAllPlayers || visibleToPlayerIds.has(player.id);
    for (const entity of entityList) {
      setSubtitleVisibilityOverride(player, entity, shouldShow);
    }
  }
}

function resolveTextRenderBatchEntities(text) {
  const entities = [];
  for (const renderBatch of text?._effect?.renderBatches ?? []) {
    const entity = world.getEntity(renderBatch.entityId);
    if (entity?.isValid && entity.typeId === GLYPH_BATCH_ENTITY_TYPE) {
      entities.push(entity);
    }
  }

  return entities;
}

function setSubtitleVisibilityOverride(player, entity, isVisible) {
  if (
    !player?.isValid ||
    typeof player.setPropertyOverrideForEntity !== "function" ||
    !entity?.isValid
  ) {
    return;
  }

  player.setPropertyOverrideForEntity(
    entity,
    SUBTITLE_VISIBLE_PROPERTY,
    isVisible ? SUBTITLE_VISIBLE_TRUE : SUBTITLE_VISIBLE_FALSE
  );
}

function getSafePlayers() {
  try {
    lastSafePlayersQueryFailed = false;
    return world.getAllPlayers();
  } catch {
    lastSafePlayersQueryFailed = true;
    return [];
  }
}

export class MisideTextCommand {
  static register() {
    installMisideTextCommand();
  }
}

function handleMisideTextCommand(origin, ...rawArgs) {
  const args = rawArgs.length === 1 && Array.isArray(rawArgs[0]) ? rawArgs[0] : rawArgs;
  const [
    text,
    timings,
    scale = DEFAULT_SCALE,
    location,
    pitch,
    yaw,
    roll,
    renderFlags
  ] = args;

  const timingConfig = parseCommandTimingSpec(timings);
  if (!timingConfig.ok) {
    return createLocalizedCommandResult(
      origin,
      CustomCommandStatus.Failure,
      timingConfig.messageKey,
      timingConfig.messageArgs
    );
  }

  const renderConfig = parseCommandRenderFlags(renderFlags);
  if (!renderConfig.ok) {
    return createLocalizedCommandResult(
      origin,
      CustomCommandStatus.Failure,
      renderConfig.messageKey,
      renderConfig.messageArgs
    );
  }

  const context = resolveCommandSpawnContext(origin, location);
  if (!context.dimension) {
    return createLocalizedCommandResult(
      origin,
      CustomCommandStatus.Failure,
      LOCALIZATION_KEYS.command.failureContext
    );
  }

  const rotation = {
    x: normalizeNumber(pitch, context.rotation.x),
    y: normalizeNumber(yaw, context.rotation.y),
    z: normalizeNumber(roll, context.rotation.z)
  };

  system.run(() => {
    new MisideText(
      location ? normalizeVec3(location) : context.location,
      `${text ?? ""}`,
      {
        dimension: context.dimension,
        rotation,
        fadeInDuration: timingConfig.fadeInDuration,
        holdDuration: timingConfig.holdDuration,
        restDuration: timingConfig.restDuration,
        fadeOutDuration: timingConfig.fadeOutDuration,
        scale: normalizePositiveNumber(scale, DEFAULT_SCALE),
        depthTest: renderConfig.depthTest,
        backfaceVisible: renderConfig.backfaceVisible,
        glow: renderConfig.glow
      }
    );
  });

  return createLocalizedCommandResult(
    origin,
    CustomCommandStatus.Success,
    LOCALIZATION_KEYS.command.success,
    [`${text ?? ""}`]
  );
}

function parseCommandTimingSpec(value) {
  if (value === undefined || value === null || `${value}`.trim() === "") {
    return {
      ok: true,
      fadeInDuration: null,
      holdDuration: DEFAULT_HOLD_DURATION,
      restDuration: DEFAULT_REST_DURATION,
      fadeOutDuration: DEFAULT_FADE_OUT_DURATION
    };
  }

  const tokens = `${value}`.split(",").map((token) => token.trim());
  if (tokens.length === 1) {
    const holdDuration = parseCommandNumberToken(tokens[0], "timings");
    if (!holdDuration.ok) {
      return holdDuration;
    }

    return {
      ok: true,
      fadeInDuration: null,
      holdDuration: normalizeDuration(holdDuration.value, DEFAULT_HOLD_DURATION),
      restDuration: DEFAULT_REST_DURATION,
      fadeOutDuration: DEFAULT_FADE_OUT_DURATION
    };
  }

  if (tokens.length > 4) {
    return {
      ok: false,
      messageKey: LOCALIZATION_KEYS.command.failureTimings,
      messageArgs: [createTranslatedTextArgument(LOCALIZATION_KEYS.parameter.timings)]
    };
  }

  const fadeInDuration = parseCommandOptionalNumberToken(tokens[0], "timings");
  if (!fadeInDuration.ok) {
    return fadeInDuration;
  }

  const holdDuration = parseCommandOptionalNumberToken(tokens[1], "timings");
  if (!holdDuration.ok) {
    return holdDuration;
  }

  const restDuration = parseCommandOptionalNumberToken(tokens[2], "timings");
  if (!restDuration.ok) {
    return restDuration;
  }

  const fadeOutDuration = parseCommandOptionalNumberToken(tokens[3], "timings");
  if (!fadeOutDuration.ok) {
    return fadeOutDuration;
  }

  return {
    ok: true,
    fadeInDuration: fadeInDuration.value == null
      ? null
      : normalizeOptionalDuration(fadeInDuration.value),
    holdDuration: holdDuration.value == null
      ? DEFAULT_HOLD_DURATION
      : normalizeDuration(holdDuration.value, DEFAULT_HOLD_DURATION),
    restDuration: restDuration.value == null
      ? DEFAULT_REST_DURATION
      : normalizeDuration(restDuration.value, DEFAULT_REST_DURATION),
    fadeOutDuration: fadeOutDuration.value == null
      ? DEFAULT_FADE_OUT_DURATION
      : normalizeDuration(fadeOutDuration.value, DEFAULT_FADE_OUT_DURATION)
  };
}

function parseCommandRenderFlags(value) {
  if (value === undefined || value === null || `${value}`.trim() === "") {
    return {
      ok: true,
      depthTest: DEFAULT_DEPTH_TEST,
      backfaceVisible: DEFAULT_BACKFACE_VISIBLE,
      glow: DEFAULT_GLOW
    };
  }

  const normalized = `${value}`.trim().toLowerCase();
  if (normalized === "default") {
    return {
      ok: true,
      depthTest: DEFAULT_DEPTH_TEST,
      backfaceVisible: DEFAULT_BACKFACE_VISIBLE,
      glow: DEFAULT_GLOW
    };
  }

  if (/^[01]{3}$/.test(normalized)) {
    return {
      ok: true,
      depthTest: normalized.charAt(0) === "1",
      backfaceVisible: normalized.charAt(1) === "1",
      glow: normalized.charAt(2) === "1"
    };
  }

  if (/^\d+$/.test(normalized)) {
    const bitmask = Number(normalized);
    if (Number.isInteger(bitmask) && bitmask >= 0 && bitmask <= 7) {
      return {
        ok: true,
        depthTest: (bitmask & 1) !== 0,
        backfaceVisible: (bitmask & 2) !== 0,
        glow: (bitmask & 4) !== 0
      };
    }
  }

  return {
    ok: false,
    messageKey: LOCALIZATION_KEYS.command.failureRenderFlags,
    messageArgs: [createTranslatedTextArgument(LOCALIZATION_KEYS.parameter.renderFlags)]
  };
}

function parseCommandOptionalNumberToken(value, label) {
  const normalized = `${value ?? ""}`.trim();
  if (normalized === "") {
    return {
      ok: true,
      value: null
    };
  }

  return parseCommandNumberToken(normalized, label);
}

function parseCommandNumberToken(value, label) {
  const normalized = `${value ?? ""}`.trim();
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return {
      ok: false,
      messageKey: LOCALIZATION_KEYS.command.failureNonNegative,
      messageArgs: [resolveCommandParameterTextArgument(label)]
    };
  }

  return {
    ok: true,
    value: parsed
  };
}

function resolveCommandSpawnContext(origin, explicitLocation) {
  const sourceEntity = origin?.sourceEntity;
  if (sourceEntity?.isValid) {
    const direction = sourceEntity.getViewDirection();
    return {
      dimension: sourceEntity.dimension,
      location: explicitLocation ? normalizeVec3(explicitLocation) : addVec(
        addVec(sourceEntity.getHeadLocation(), scaleVec(direction, SUBTITLE_DISTANCE)),
        { x: 0, y: -SUBTITLE_DROP, z: 0 }
      ),
      rotation: {
        x: sourceEntity.getRotation().x,
        y: sourceEntity.getRotation().y,
        z: 0
      }
    };
  }

  const sourceBlock = origin?.sourceBlock;
  if (sourceBlock) {
    return {
      dimension: sourceBlock.dimension,
      location: explicitLocation ? normalizeVec3(explicitLocation) : {
        x: sourceBlock.location.x + 0.5,
        y: sourceBlock.location.y + 1.8,
        z: sourceBlock.location.z + 0.5
      },
      rotation: { x: 0, y: 0, z: 0 }
    };
  }

  return {
    dimension: null,
    location: explicitLocation ? normalizeVec3(explicitLocation) : null,
    rotation: { x: 0, y: 0, z: 0 }
  };
}

function createEmptyEffectState() {
  const defaultStageTimings = resolveStageTimings(countSubtitleSlots(DEFAULT_TEXT), {
    fadeInDuration: null,
    holdDuration: DEFAULT_HOLD_DURATION,
    restDuration: DEFAULT_REST_DURATION,
    fadeOutDuration: DEFAULT_FADE_OUT_DURATION
  });

  return {
    tick: 0,
    fadeInTicks: defaultStageTimings.fadeInTicks,
    fadeInCharIntervalTicks: defaultStageTimings.fadeInCharIntervalTicks,
    fadeInCharPopTicks: defaultStageTimings.fadeInCharPopTicks,
    holdTicks: defaultStageTimings.holdTicks,
    restTicks: defaultStageTimings.restTicks,
    fadeOutTicks: defaultStageTimings.fadeOutTicks,
    cleanupTick: Number.POSITIVE_INFINITY,
    dropStartTick: Number.POSITIVE_INFINITY,
    dimension: null,
    anchor: zeroVec(),
    basis: {
      forward: { x: 0, y: 0, z: 1 },
      right: { x: 1, y: 0, z: 0 },
      up: { x: 0, y: 1, z: 0 }
    },
    baseRotation: toBaseRotation(),
    totalSlots: 0,
    scale: DEFAULT_SCALE,
    useRotation: DEFAULT_USE_ROTATION,
    depthTest: DEFAULT_DEPTH_TEST,
    backfaceVisible: DEFAULT_BACKFACE_VISIBLE,
    glow: DEFAULT_GLOW,
    setupSig: 0,
    dropSig: 0,
    dropStarted: false,
    renderBatches: []
  };
}

function normalizeConstructorOptions(locationOrOptions, text, options) {
  if (isConstructorOptionsObject(locationOrOptions)) {
    return {
      ...locationOrOptions
    };
  }

  return {
    ...options,
    location: locationOrOptions,
    text
  };
}

function isConstructorOptionsObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  return "dimension" in value ||
    "text" in value ||
    "location" in value ||
    "rotation" in value ||
    "renderer" in value ||
    "basisDirection" in value ||
    "attachedTo" in value ||
    "letterSpacing" in value ||
    "lineSpacing" in value ||
    "useRotation" in value ||
    "depthTest" in value ||
    "backfaceVisible" in value ||
    "glow" in value ||
    "fadeInDuration" in value ||
    "holdDuration" in value ||
    "restDuration" in value ||
    "fadeOutDuration" in value ||
    "visibleTo" in value ||
    "scale" in value;
}

function buildLetterDescriptors(
  text,
  letterSpacing = GLYPH_ADVANCE,
  lineSpacing = SHARD_LINE_SPACING
) {
  const lines = buildStyledSubtitleLines(text);
  const descriptors = [];
  let slotIndex = 0;

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const chars = lines[lineIndex];
    const lineOffset = getLineOffset(lineIndex, lines.length, lineSpacing);

    for (let charIndex = 0; charIndex < chars.length; charIndex += 1) {
      const descriptor = chars[charIndex];
      const glyph = glyphFromCharacter(descriptor.char);
      descriptors.push({
        page: glyph.page,
        cell: glyph.cell,
        sequenceIndex: slotIndex,
        centeredOffset: getCenteredOffset(charIndex, chars.length, letterSpacing),
        lineOffset,
        red: descriptor.color.red,
        green: descriptor.color.green,
        blue: descriptor.color.blue,
        randoms: Array.from({ length: SLOT_RANDOM_SCALAR_COUNT }, () => Math.random())
      });
      slotIndex += 1;
    }
  }

  return {
    descriptors,
    totalSlots: slotIndex
  };
}

function spawnAtlasBatchLetters(dimension, descriptors, anchor, ownerId) {
  const renderBatches = [];

  for (let offset = 0; offset < descriptors.length; offset += GLYPH_BATCH_SLOT_COUNT) {
    const entity = dimension.spawnEntity(GLYPH_BATCH_ENTITY_TYPE, anchor);
    if (!entity?.isValid) {
      clearPendingSubtitleEntityIds(renderBatches);
      for (const renderBatch of renderBatches) {
        removeEntity(world.getEntity(renderBatch.entityId));
      }

      return null;
    }

    const batchIndex = renderBatches.length;
    if (!applySubtitleEntityIdentityTags(entity, ownerId, batchIndex)) {
      removeEntity(entity);
      clearPendingSubtitleEntityIds(renderBatches);
      for (const renderBatch of renderBatches) {
        removeEntity(world.getEntity(renderBatch.entityId));
      }

      return null;
    }

    const slots = descriptors
      .slice(offset, offset + GLYPH_BATCH_SLOT_COUNT)
      .map((descriptor, slotIndex) => ({
        slotIndex,
        sequenceIndex: descriptor.sequenceIndex,
        centeredOffset: descriptor.centeredOffset,
        lineOffset: descriptor.lineOffset,
        page: descriptor.page ?? 0,
        cell: descriptor.cell ?? 0,
        red: descriptor.red ?? DEFAULT_TEXT_COLOR.red,
        green: descriptor.green ?? DEFAULT_TEXT_COLOR.green,
        blue: descriptor.blue ?? DEFAULT_TEXT_COLOR.blue,
        randoms: Array.isArray(descriptor.randoms)
          ? descriptor.randoms.slice(0, SLOT_RANDOM_SCALAR_COUNT)
          : []
      }));

    renderBatches.push({
      entityId: entity.id,
      slots,
      animationNonce: 0,
      setupPacketIndex: 0,
      setupComplete: false,
      dropPacketIndex: 0,
      dropPacketCount: 0,
      dropComplete: false,
      collisionSnapshot: null,
      maxDroppedTicks: SHARD_FAILSAFE_TICKS,
      lastOriginSignature: null,
      lastControlSignature: null
    });
  }

  return {
    renderBatches
  };
}

function syncAtlasRenderBatches(effect) {
  const nextBatches = [];
  const cleanupReached = effect.dropStarted && effect.tick >= effect.cleanupTick;
  let trackedCount = 0;

  for (const renderBatch of effect.renderBatches) {
    const entity = world.getEntity(renderBatch.entityId);
    if (!entity?.isValid) {
      if (!cleanupReached) {
        nextBatches.push(renderBatch);
        trackedCount += renderBatch.slots.length;
      }
      continue;
    }

    if (cleanupReached) {
      removeEntity(entity);
      continue;
    }

    syncAtlasRenderBatch(effect, renderBatch, entity);
    nextBatches.push(renderBatch);
    trackedCount += renderBatch.slots.length;
  }

  effect.renderBatches = nextBatches;
  return trackedCount;
}

function syncAtlasRenderBatch(effect, renderBatch, entity) {
  const originSignature = getVecSignature(effect.anchor);
  if (originSignature !== renderBatch.lastOriginSignature) {
    entity.teleport(effect.anchor, {
      dimension: effect.dimension,
      checkForBlocks: false
    });
    renderBatch.lastOriginSignature = originSignature;
  }

  if (!renderBatch.setupComplete) {
    sendBatchStopExpression(
      renderBatch,
      entity,
      buildNextBatchSetupPacket(effect, renderBatch)
    );
    renderBatch.setupPacketIndex += 1;
    if (renderBatch.setupPacketIndex >= getBatchSetupPacketCount()) {
      renderBatch.setupComplete = true;
      renderBatch.dropPacketIndex = 0;
      renderBatch.dropPacketCount = renderBatch.collisionSnapshot
        ? getBatchDropPacketCount(renderBatch.collisionSnapshot)
        : 0;
      renderBatch.dropComplete = false;
      renderBatch.lastControlSignature = buildBatchControlSignature(effect);
    }
    return;
  }

  if (effect.dropStarted) {
    if (!renderBatch.dropComplete) {
      sendBatchStopExpression(
        renderBatch,
        entity,
        buildNextBatchDropPacket(effect, renderBatch)
      );
      renderBatch.dropPacketIndex += 1;
      if (renderBatch.dropPacketIndex >= renderBatch.dropPacketCount) {
        renderBatch.dropComplete = true;
      }
      renderBatch.lastControlSignature = buildBatchControlSignature(effect);
    }
    return;
  }

  const controlSignature = buildBatchControlSignature(effect);
  if (controlSignature !== renderBatch.lastControlSignature) {
    sendBatchStopExpression(
      renderBatch,
      entity,
      buildBatchControlStopStack(effect)
    );
    renderBatch.lastControlSignature = controlSignature;
  }
}

function sendBatchStopExpression(renderBatch, entity, stopStack) {
  renderBatch.animationNonce += 1;
  entity.playAnimation(GLYPH_BATCH_UPDATE_ANIMATION, {
    stopExpression: `${stopStack}return !${formatFloat(STOP_EXPRESSION_FALSE + renderBatch.animationNonce * 0.000001)};`
  });
}

function getBatchSetupPacketCount() {
  return 3 + Math.ceil(GLYPH_BATCH_SLOT_COUNT / GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE);
}

function buildNextBatchSetupPacket(effect, renderBatch) {
  const chunkCount = Math.ceil(GLYPH_BATCH_SLOT_COUNT / GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE);
  const packetIndex = renderBatch.setupPacketIndex ?? 0;

  if (packetIndex <= 0) {
    return createBatchSharedAssignment(effect, {
      setupSig: 0,
      dropSig: 0,
      colReady: 0,
      colOriginX: 0,
      colOriginZ: 0,
      colSizeX: 0,
      colSizeZ: 0
    });
  }

  if (packetIndex === 1) {
    return buildBatchSetupWarmupChunk();
  }

  if (packetIndex <= chunkCount + 1) {
    const chunkStart = (packetIndex - 2) * GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE;
    return buildBatchSlotSetupChunk(renderBatch, chunkStart, GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE);
  }

  return createBatchSharedAssignment(effect, {
    setupSig: effect.setupSig,
    dropSig: effect.dropStarted ? effect.dropSig : 0,
    colReady: 0,
    colOriginX: 0,
    colOriginZ: 0,
    colSizeX: 0,
    colSizeZ: 0
  });
}

function buildBatchSlotSetupChunk(renderBatch, chunkStart, chunkSize) {
  let stack = "";

  for (
    let slotIndex = chunkStart;
    slotIndex < Math.min(chunkStart + chunkSize, GLYPH_BATCH_SLOT_COUNT);
    slotIndex += 1
  ) {
    const slot = renderBatch.slots[slotIndex];
    stack += slot
      ? createBatchSlotStaticAssignment(slot)
      : createBatchSetupSlotReset(slotIndex);
  }

  return stack;
}

function buildBatchSetupWarmupChunk() {
  let stack = "";
  const warmupText = "ABCD";

  for (
    let slotIndex = 0;
    slotIndex < Math.min(GLYPH_BATCH_SETUP_SLOT_CHUNK_SIZE, GLYPH_BATCH_SLOT_COUNT);
    slotIndex += 1
  ) {
    const glyph = glyphFromCharacter(warmupText[slotIndex] ?? "A");
    stack += createBatchSlotHiddenAssignment(slotIndex, glyph.page, glyph.cell);
  }

  return stack;
}

function buildBatchControlStopStack(effect) {
  return createBatchSharedAssignment(effect);
}

function getBatchDropPacketCount(collisionSnapshot) {
  const activeColumnCount = collisionSnapshot?.entries?.length ?? 0;
  return 2 + Math.ceil(activeColumnCount / GLYPH_BATCH_DROP_COLLISION_CHUNK_SIZE);
}

function buildNextBatchDropPacket(effect, renderBatch) {
  const collisionSnapshot = renderBatch.collisionSnapshot;
  if (!collisionSnapshot) {
    return createBatchSharedAssignment(effect, {
      dropSig: effect.dropSig,
      colReady: 1,
      colOriginX: 0,
      colOriginZ: 0,
      colSizeX: 0,
      colSizeZ: 0
    });
  }

  const chunkCount = Math.ceil(
    (collisionSnapshot.entries?.length ?? 0) / GLYPH_BATCH_DROP_COLLISION_CHUNK_SIZE
  );
  const packetIndex = renderBatch.dropPacketIndex ?? 0;

  if (packetIndex <= 0) {
    return createBatchSharedAssignment(effect, {
      dropSig: 0,
      colReady: 0,
      colOriginX: collisionSnapshot.originX,
      colOriginZ: collisionSnapshot.originZ,
      colSizeX: collisionSnapshot.sizeX,
      colSizeZ: collisionSnapshot.sizeZ
    });
  }

  if (packetIndex <= chunkCount) {
    const chunkStart = (packetIndex - 1) * GLYPH_BATCH_DROP_COLLISION_CHUNK_SIZE;
    return buildBatchCollisionChunk(
      collisionSnapshot,
      chunkStart,
      GLYPH_BATCH_DROP_COLLISION_CHUNK_SIZE
    );
  }

  return createBatchSharedAssignment(effect, {
    dropSig: effect.dropSig,
    colReady: 1,
    colOriginX: collisionSnapshot.originX,
    colOriginZ: collisionSnapshot.originZ,
    colSizeX: collisionSnapshot.sizeX,
    colSizeZ: collisionSnapshot.sizeZ
  });
}

function buildBatchCollisionChunk(collisionSnapshot, chunkStart, chunkSize) {
  let stack = "";
  const entries = collisionSnapshot?.entries ?? [];

  for (
    let entryIndex = chunkStart;
    entryIndex < Math.min(chunkStart + chunkSize, entries.length);
    entryIndex += 1
  ) {
    const entry = entries[entryIndex];
    stack +=
      `v.c${entry.index}_y=${formatFloat(entry.baseY)};` +
      `v.c${entry.index}_code=${entry.code};`;
  }

  return stack;
}

function createBatchSetupSlotReset(slotIndex) {
  return createBatchSlotHiddenAssignment(slotIndex, 0, 0);
}

function createBatchSlotHiddenAssignment(slotIndex, page, cell) {
  const glyphSlot = `g${slotIndex}`;
  const stateSlot = `s${slotIndex}`;
  const parts = [
    `v.${glyphSlot}_page=${page};`,
    `v.${glyphSlot}_cell=${cell};`,
    `v.${glyphSlot}_red=${DEFAULT_TEXT_COLOR.red};`,
    `v.${glyphSlot}_green=${DEFAULT_TEXT_COLOR.green};`,
    `v.${glyphSlot}_blue=${DEFAULT_TEXT_COLOR.blue};`,
    `v.${stateSlot}_enabled=0;`,
    `v.${stateSlot}_seq=0;`,
    `v.${stateSlot}_center=0;`,
    `v.${stateSlot}_line=0;`
  ];

  for (let randomIndex = 0; randomIndex < SLOT_RANDOM_SCALAR_COUNT; randomIndex += 1) {
    parts.push(`v.${stateSlot}_r${randomIndex}=0;`);
  }

  return parts.join("");
}

function createBatchSharedAssignment(effect, options = {}) {
  const basis = effect.basis;
  const assignments = [
    `v.m_total_slots=${effect.totalSlots};`,
    `v.m_fade_in_ticks=${formatFloat(effect.fadeInTicks)};`,
    `v.m_fade_in_interval_ticks=${formatFloat(effect.fadeInCharIntervalTicks)};`,
    `v.m_fade_in_pop_ticks=${formatFloat(effect.fadeInCharPopTicks)};`,
    `v.m_hold_ticks=${formatFloat(effect.holdTicks)};`,
    `v.m_rest_ticks=${formatFloat(effect.restTicks)};`,
    `v.m_fade_out_ticks=${formatFloat(effect.fadeOutTicks)};`,
    `v.m_scale=${formatFloat(effect.scale)};`,
    `v.m_use_rotation=${effect.useRotation ? 1 : 0};`,
    `v.m_depth_test=${effect.depthTest ? 1 : 0};`,
    `v.m_backface_visible=${effect.backfaceVisible ? 1 : 0};`,
    `v.m_glow=${effect.glow ? 1 : 0};`,
    `v.m_base_pitch=${formatFloat(effect.baseRotation.pitch)};`,
    `v.m_base_yaw=${formatFloat(effect.baseRotation.yaw)};`,
    `v.m_base_roll=${formatFloat(effect.baseRotation.roll)};`,
    `v.m_basis_fx=${formatFloat(basis.forward.x)};`,
    `v.m_basis_fy=${formatFloat(basis.forward.y)};`,
    `v.m_basis_fz=${formatFloat(basis.forward.z)};`,
    `v.m_basis_rx=${formatFloat(basis.right.x)};`,
    `v.m_basis_ry=${formatFloat(basis.right.y)};`,
    `v.m_basis_rz=${formatFloat(basis.right.z)};`,
    `v.m_basis_ux=${formatFloat(basis.up.x)};`,
    `v.m_basis_uy=${formatFloat(basis.up.y)};`,
    `v.m_basis_uz=${formatFloat(basis.up.z)};`
  ];

  if (options.setupSig !== undefined) {
    assignments.unshift(`v.m_setup_sig=${options.setupSig};`);
  }

  if (options.dropSig !== undefined) {
    assignments.unshift(`v.m_drop_sig=${options.dropSig};`);
  }

  if (options.colReady !== undefined) {
    assignments.unshift(`v.m_col_ready=${options.colReady};`);
  }

  if (options.colOriginX !== undefined) {
    assignments.push(`v.m_col_origin_x=${formatFloat(options.colOriginX)};`);
  }

  if (options.colOriginZ !== undefined) {
    assignments.push(`v.m_col_origin_z=${formatFloat(options.colOriginZ)};`);
  }

  if (options.colSizeX !== undefined) {
    assignments.push(`v.m_col_size_x=${formatFloat(options.colSizeX)};`);
  }

  if (options.colSizeZ !== undefined) {
    assignments.push(`v.m_col_size_z=${formatFloat(options.colSizeZ)};`);
  }

  return assignments.join("");
}

function createBatchSlotStaticAssignment(slot) {
  const glyphSlot = `g${slot.slotIndex}`;
  const stateSlot = `s${slot.slotIndex}`;
  const parts = [
    `v.${glyphSlot}_page=${slot.page};`,
    `v.${glyphSlot}_cell=${slot.cell};`,
    `v.${glyphSlot}_red=${slot.red ?? DEFAULT_TEXT_COLOR.red};`,
    `v.${glyphSlot}_green=${slot.green ?? DEFAULT_TEXT_COLOR.green};`,
    `v.${glyphSlot}_blue=${slot.blue ?? DEFAULT_TEXT_COLOR.blue};`,
    `v.${stateSlot}_enabled=1;`,
    `v.${stateSlot}_seq=${slot.sequenceIndex};`,
    `v.${stateSlot}_center=${formatFloat(slot.centeredOffset)};`,
    `v.${stateSlot}_line=${formatFloat(slot.lineOffset)};`
  ];

  for (let randomIndex = 0; randomIndex < SLOT_RANDOM_SCALAR_COUNT; randomIndex += 1) {
    parts.push(
      `v.${stateSlot}_r${randomIndex}=${formatFloat(slot.randoms[randomIndex] ?? 0)};`
    );
  }

  return parts.join("");
}

function buildBatchControlSignature(effect) {
  return [
    effect.totalSlots,
    formatFloat(effect.fadeInTicks),
    formatFloat(effect.fadeInCharIntervalTicks),
    formatFloat(effect.fadeInCharPopTicks),
    formatFloat(effect.holdTicks),
    formatFloat(effect.restTicks),
    formatFloat(effect.fadeOutTicks),
    effect.useRotation ? 1 : 0,
    effect.depthTest ? 1 : 0,
    effect.backfaceVisible ? 1 : 0,
    effect.glow ? 1 : 0,
    formatFloat(effect.scale),
    formatFloat(effect.baseRotation.pitch),
    formatFloat(effect.baseRotation.yaw),
    formatFloat(effect.baseRotation.roll),
    getBasisSignature(effect.basis)
  ].join("|");
}

function getBasisSignature(basis) {
  return [
    getVecSignature(basis.forward),
    getVecSignature(basis.right),
    getVecSignature(basis.up)
  ].join("|");
}

function getDropCleanupTick(effect) {
  if (!Number.isFinite(effect?.dropStartTick)) {
    return Number.POSITIVE_INFINITY;
  }

  return effect.dropStartTick +
    getMaxBatchDropLifetimeTicks(effect) +
    Math.max(0, effect?.restTicks ?? 0) +
    Math.max(0, effect?.fadeOutTicks ?? 0) +
    POST_DROP_CLEANUP_MARGIN_TICKS;
}

function getMaxBatchDropLifetimeTicks(effect) {
  let maxBatchLifetime = Number.NEGATIVE_INFINITY;

  for (const renderBatch of effect?.renderBatches ?? []) {
    const batchLifetime =
      getRenderBatchLastSequenceIndex(renderBatch) +
      getRenderBatchMaxDroppedTicks(renderBatch);

    if (batchLifetime > maxBatchLifetime) {
      maxBatchLifetime = batchLifetime;
    }
  }

  if (Number.isFinite(maxBatchLifetime)) {
    return maxBatchLifetime;
  }

  return Math.max(0, Math.trunc((effect?.totalSlots ?? 0) - 1)) + SHARD_FAILSAFE_TICKS;
}

function glyphFromCharacter(char) {
  if (char.length === 0) {
    return glyphFromCodePoint(FALLBACK_GLYPH_CODE_POINT);
  }

  const codePoint = char.codePointAt(0) ?? 0;
  if (codePoint < 0 || codePoint > 0xFFFF) {
    return glyphFromCodePoint(FALLBACK_GLYPH_CODE_POINT);
  }

  return glyphFromCodePoint(codePoint);
}

function glyphFromCodePoint(codePoint) {
  const hex = codePoint.toString(16).padStart(4, "0").toUpperCase();
  const page = Number.parseInt(hex.slice(0, 2), 16) || 0;
  const row = Number.parseInt(hex.charAt(2), 16) || 0;
  const column = Number.parseInt(hex.charAt(3), 16) || 0;

  return {
    page,
    cell: row * 16 + column
  };
}

function getCenteredOffset(index, totalChars, letterSpacing = GLYPH_ADVANCE) {
  return (((totalChars - 1) * 0.5) - index) * letterSpacing;
}

function getLineOffset(lineIndex, totalLines, lineSpacing = SHARD_LINE_SPACING) {
  const centeredLine = lineIndex - ((totalLines - 1) * 0.5);
  return -centeredLine * lineSpacing;
}

function getMainDropStartTick(fadeInTicks, holdTicks) {
  return Math.max(0, fadeInTicks) + Math.max(0, holdTicks);
}

function prepareBatchDropCollision(effect, frozenAnchor) {
  for (const renderBatch of effect.renderBatches ?? []) {
    const collisionAnchor = computeBatchCollisionAnchor(effect, renderBatch, frozenAnchor);
    const collisionSnapshot = buildBatchCollisionSnapshot(effect, renderBatch, collisionAnchor);
    renderBatch.collisionSnapshot = collisionSnapshot;
    renderBatch.maxDroppedTicks = computeBatchMaxDroppedTicks(
      effect,
      renderBatch,
      collisionSnapshot,
      frozenAnchor.y
    );
    renderBatch.dropPacketIndex = 0;
    renderBatch.dropPacketCount = getBatchDropPacketCount(collisionSnapshot);
    renderBatch.dropComplete = false;
  }
}

function computeBatchCollisionAnchor(effect, renderBatch, anchor) {
  const bounds = computeBatchCollisionBounds(effect, renderBatch);

  if (!Number.isFinite(bounds.minX) || !Number.isFinite(bounds.minZ)) {
    return cloneVec(anchor);
  }

  return {
    x: anchor.x + ((bounds.minX + bounds.maxX) * 0.5),
    y: anchor.y,
    z: anchor.z + ((bounds.minZ + bounds.maxZ) * 0.5)
  };
}

function buildBatchCollisionSnapshot(effect, renderBatch, anchor) {
  const size = GLYPH_BATCH_COLLISION_FIELD_SIZE;
  const originX = Math.round(anchor.x) - GLYPH_BATCH_COLLISION_FIELD_RADIUS;
  const originZ = Math.round(anchor.z) - GLYPH_BATCH_COLLISION_FIELD_RADIUS;
  const spatialRadius = computeBatchSpatialRadius(effect, renderBatch);
  const scanTopY = Math.floor(
    anchor.y +
    spatialRadius +
    GROUND_SCAN_UP +
    GLYPH_BATCH_COLLISION_SCAN_TOP_MARGIN
  );
  const scanBottomY = Math.floor(
    anchor.y -
    spatialRadius -
    GLYPH_BATCH_COLLISION_SCAN_BOTTOM_MARGIN
  );
  const entries = [];

  for (let cellZ = 0; cellZ < GLYPH_BATCH_COLLISION_FIELD_SIZE; cellZ += 1) {
    for (let cellX = 0; cellX < GLYPH_BATCH_COLLISION_FIELD_SIZE; cellX += 1) {
      let baseY = 0;
      let code = COLLISION_CODE_EMPTY;
      const worldX = originX + cellX;
      const worldZ = originZ + cellZ;
      const column = findBatchCollisionColumn(
        effect.dimension,
        worldX,
        worldZ,
        scanTopY,
        scanBottomY
      );

      if (column) {
        baseY = column.baseY;
        code = column.code;
      }

      entries.push({
        index: (cellZ * GLYPH_BATCH_COLLISION_FIELD_SIZE) + cellX,
        baseY,
        code
      });
    }
  }

  return {
    originX,
    originZ,
    sizeX: size,
    sizeZ: size,
    scanTopY,
    scanBottomY,
    entries
  };
}

function computeBatchMaxDroppedTicks(effect, renderBatch, collisionSnapshot, anchorY) {
  const lastSlot = getRenderBatchLastSlot(renderBatch);
  const scanBottomY = normalizeNumber(collisionSnapshot?.scanBottomY, Number.NaN);
  const baseAnchorY = normalizeNumber(anchorY, Number.NaN);

  if (!lastSlot || !Number.isFinite(scanBottomY) || !Number.isFinite(baseAnchorY)) {
    return SHARD_FAILSAFE_TICKS;
  }

  const startState = computeSlotDropStartVerticalState(effect, lastSlot);
  if (!startState) {
    return SHARD_FAILSAFE_TICKS;
  }

  const targetLocalY = scanBottomY - baseAnchorY;
  const apexState = computeTheoreticalDropApex(
    startState.localY,
    startState.velocityY,
    effect.scale
  );
  const descentTicks = countTicksUntilVerticalPlaneCross(
    apexState.localY,
    apexState.velocityY,
    effect.scale,
    targetLocalY
  );

  if (!Number.isFinite(descentTicks)) {
    return SHARD_FAILSAFE_TICKS;
  }

  return Math.max(1, apexState.ticks + descentTicks);
}

function computeSlotDropStartVerticalState(effect, slot) {
  if (!slot) {
    return null;
  }

  const basis = effect?.basis ?? {
    forward: { x: 0, y: 0, z: 1 },
    right: { x: 1, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 }
  };
  const scale = normalizePositiveNumber(effect?.scale, DEFAULT_SCALE);
  const randoms = Array.isArray(slot.randoms) ? slot.randoms : [];
  const center = normalizeNumber(slot.centeredOffset, 0) * scale;
  const line = normalizeNumber(slot.lineOffset, 0) * scale;
  const dropBob = computeSlotDropStartBob(effect, slot, scale);
  const upJitter = scale * (-0.02 + (normalizeNumber(randoms[0], 0) * 0.05));
  const layoutY = line + (MAIN_FLOAT_Y_OFFSET * scale) + dropBob;
  const forwardMag = scale * (0.03 + (normalizeNumber(randoms[4], 0) * 0.02));
  const upVel = scale * normalizeNumber(randoms[5], 0) * 0.05;
  const scatterY = scale * (0.08 + (normalizeNumber(randoms[2], 0) * 0.08));

  return {
    localY:
      (basis.right.y * center) +
      (basis.up.y * (layoutY + upJitter)),
    velocityY:
      (basis.forward.y * forwardMag) +
      (basis.right.y * (center * 0.015)) +
      (basis.up.y * upVel) +
      scatterY
  };
}

function computeSlotDropStartBob(effect, slot, scale) {
  const sequenceIndex = Math.max(0, Math.trunc(normalizeNumber(slot?.sequenceIndex, 0)));
  if (sequenceIndex >= 1) {
    return 0;
  }

  const dropLogicTick = normalizeNumber(
    effect?.dropStartTick,
    getMainDropStartTick(effect?.fadeInTicks ?? 0, effect?.holdTicks ?? 0) + 1
  );

  return Math.sin(
    (dropLogicTick - 1 - normalizeNumber(effect?.fadeInCharPopTicks, MAIN_CHAR_POP_TICKS)) *
    MAIN_BOB_SPEED
  ) * (MAIN_BOB_AMPLITUDE * scale);
}

function computeTheoreticalDropApex(startLocalY, startVelocityY, scale) {
  let localY = startLocalY;
  let velocityY = startVelocityY;
  let highestY = startLocalY;
  let highestVelocityY = startVelocityY;
  let highestTick = 0;

  for (let tick = 1; tick <= MAX_DROP_TICK_SIMULATION_TICKS; tick += 1) {
    const nextState = advanceVerticalDropState(localY, velocityY, scale);
    localY = nextState.localY;
    velocityY = nextState.velocityY;

    if (localY > highestY) {
      highestY = localY;
      highestVelocityY = velocityY;
      highestTick = tick;
    }

    if (velocityY <= 0 && localY <= highestY) {
      break;
    }
  }

  return {
    localY: highestY,
    velocityY: highestVelocityY,
    ticks: highestTick
  };
}

function countTicksUntilVerticalPlaneCross(startLocalY, startVelocityY, scale, targetLocalY) {
  if (!Number.isFinite(targetLocalY)) {
    return Number.NaN;
  }

  if (startLocalY <= targetLocalY) {
    return 0;
  }

  let localY = startLocalY;
  let velocityY = startVelocityY;

  for (let tick = 1; tick <= MAX_DROP_TICK_SIMULATION_TICKS; tick += 1) {
    const nextState = advanceVerticalDropState(localY, velocityY, scale);
    localY = nextState.localY;
    velocityY = nextState.velocityY;

    if (localY <= targetLocalY) {
      return tick;
    }
  }

  return Number.NaN;
}

function advanceVerticalDropState(localY, velocityY, scale) {
  const physicsScale = normalizePositiveNumber(scale, DEFAULT_SCALE);
  let nextLocalY = localY;
  let nextVelocityY = velocityY;

  for (let substep = 0; substep < SHARD_PHYSICS_SUBSTEPS; substep += 1) {
    nextVelocityY -= SHARD_GRAVITY_STEP * SHARD_PHYSICS_SUBSTEP_SCALE * physicsScale;
    nextLocalY += nextVelocityY * SHARD_PHYSICS_SUBSTEP_SCALE;
  }

  nextVelocityY *= SHARD_VELOCITY_DRAG;

  return {
    localY: nextLocalY,
    velocityY: nextVelocityY
  };
}

function getRenderBatchLastSlot(renderBatch) {
  let lastSlot = null;
  let lastSequenceIndex = Number.NEGATIVE_INFINITY;

  for (const slot of renderBatch?.slots ?? []) {
    const sequenceIndex = normalizeNumber(slot?.sequenceIndex, Number.NEGATIVE_INFINITY);
    if (sequenceIndex > lastSequenceIndex) {
      lastSequenceIndex = sequenceIndex;
      lastSlot = slot;
    }
  }

  return lastSlot;
}

function getRenderBatchLastSequenceIndex(renderBatch) {
  return Math.max(
    0,
    Math.trunc(normalizeNumber(getRenderBatchLastSlot(renderBatch)?.sequenceIndex, 0))
  );
}

function getRenderBatchMaxDroppedTicks(renderBatch) {
  return Math.max(
    1,
    Math.trunc(normalizeNumber(renderBatch?.maxDroppedTicks, SHARD_FAILSAFE_TICKS))
  );
}

function computeBatchCollisionRadius(effect, renderBatch) {
  const bounds = computeBatchCollisionBounds(effect, renderBatch);
  const halfSpanX = Number.isFinite(bounds.minX)
    ? (bounds.maxX - bounds.minX) * 0.5
    : 0;
  const halfSpanZ = Number.isFinite(bounds.minZ)
    ? (bounds.maxZ - bounds.minZ) * 0.5
    : 0;
  const sampleMargin = (SUPPORT_SAMPLE_HALF_SIZE * effect.scale) + 0.9;

  return Math.max(
    1,
    Math.min(
      GLYPH_BATCH_COLLISION_FIELD_RADIUS,
      Math.ceil(Math.max(halfSpanX, halfSpanZ) + sampleMargin)
    )
  );
}

function computeBatchCollisionBounds(effect, renderBatch) {
  const basis = effect?.basis ?? {
    forward: { x: 0, y: 0, z: 1 },
    right: { x: 1, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 }
  };
  const scale = effect?.scale ?? 1;
  const upOffset = MAIN_FLOAT_Y_OFFSET * scale;
  const motionBudget = GLYPH_BATCH_COLLISION_HORIZONTAL_MARGIN * scale;
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  for (const slot of renderBatch?.slots ?? []) {
    const randoms = Array.isArray(slot?.randoms) ? slot.randoms : [];
    const center = normalizeNumber(slot?.centeredOffset, 0) * scale;
    const line = normalizeNumber(slot?.lineOffset, 0) * scale;
    const upJitter = scale * (-0.02 + (normalizeNumber(randoms[0], 0) * 0.05));
    const layoutY = line + upOffset + upJitter;
    const startX = (basis.right.x * center) + (basis.up.x * layoutY);
    const startZ = (basis.right.z * center) + (basis.up.z * layoutY);
    const scatterX = scale * (normalizeNumber(randoms[1], 0.5) - 0.5) * 0.06;
    const scatterZ = scale * (normalizeNumber(randoms[3], 0.5) - 0.5) * 0.06;
    const forwardMag = scale * (0.03 + (normalizeNumber(randoms[4], 0) * 0.02));
    const upVel = scale * normalizeNumber(randoms[5], 0) * 0.05;
    const velocityX = (basis.forward.x * forwardMag) +
      (basis.right.x * (center * 0.015)) +
      (basis.up.x * upVel) +
      scatterX;
    const velocityZ = (basis.forward.z * forwardMag) +
      (basis.right.z * (center * 0.015)) +
      (basis.up.z * upVel) +
      scatterZ;

    includeBatchCollisionPoint(startX, startZ);

    const horizontalSpeedSq = (velocityX * velocityX) + (velocityZ * velocityZ);
    if (horizontalSpeedSq > 0.000001) {
      const driftScale = motionBudget / Math.sqrt(horizontalSpeedSq);
      includeBatchCollisionPoint(
        startX + (velocityX * driftScale),
        startZ + (velocityZ * driftScale)
      );
    }
  }

  return {
    minX,
    maxX,
    minZ,
    maxZ
  };

  function includeBatchCollisionPoint(x, z) {
    if (x < minX) {
      minX = x;
    }
    if (x > maxX) {
      maxX = x;
    }
    if (z < minZ) {
      minZ = z;
    }
    if (z > maxZ) {
      maxZ = z;
    }
  }
}

function computeBatchSpatialRadius(effect, renderBatch) {
  const scale = effect.scale;
  const offsetMargin = scale * (MAIN_FLOAT_Y_OFFSET + 0.03);
  let maxRadius = 0;

  for (const slot of renderBatch.slots ?? []) {
    const radius =
      Math.abs(slot.centeredOffset) * scale +
      Math.abs(slot.lineOffset) * scale +
      offsetMargin;

    if (radius > maxRadius) {
      maxRadius = radius;
    }
  }

  return maxRadius;
}

function findBatchCollisionColumn(dimension, blockX, blockZ, scanTopY, scanBottomY) {
  if (!dimension) {
    return null;
  }

  for (let blockY = scanTopY; blockY >= scanBottomY; blockY -= 1) {
    let block = null;

    try {
      block = dimension.getBlock({ x: blockX, y: blockY, z: blockZ });
    } catch {
      block = null;
    }

    const code = encodeCollisionBlock(block);
    if (code !== COLLISION_CODE_EMPTY) {
      return {
        baseY: blockY,
        code
      };
    }
  }

  return null;
}

function encodeCollisionBlock(block) {
  const blockName = getBlockName(block?.typeId);
  if (!blockName || isAirLikeBlock(block) || isLiquidLikeBlock(block) || isRailBlock(block)) {
    return COLLISION_CODE_EMPTY;
  }

  if (isSnowLayerBlockName(blockName)) {
    return encodeSnowCollision(block);
  }

  if (isCarpetBlockName(blockName)) {
    return COLLISION_CODE_CARPET;
  }

  if (isPressurePlateBlockName(blockName)) {
    return COLLISION_CODE_PRESSURE_PLATE;
  }

  if (isPathBlockName(blockName)) {
    return COLLISION_CODE_PATH;
  }

  if (isTrapdoorBlockName(blockName)) {
    return encodeTrapdoorCollision(block);
  }

  if (isSlabBlockName(blockName)) {
    return encodeSlabCollision(block);
  }

  if (isStairBlockName(blockName)) {
    return encodeStairCollision(block);
  }

  if (isDefinitelyNonSupportingBlock(blockName)) {
    return COLLISION_CODE_EMPTY;
  }

  return COLLISION_CODE_FULL;
}

function encodeSnowCollision(block) {
  const snowHeight = getSnowLayerCount(block);
  if (!snowHeight) {
    return getBlockName(block?.typeId) === "snow"
      ? COLLISION_CODE_FULL
      : COLLISION_CODE_CARPET;
  }

  return COLLISION_CODE_SNOW_BASE + snowHeight - 1;
}

function encodeTrapdoorCollision(block) {
  if (getBooleanBlockState(block, [
    "minecraft:open_bit",
    "open_bit"
  ])) {
    return COLLISION_CODE_EMPTY;
  }

  return getVerticalHalfState(block) === "top"
    ? COLLISION_CODE_FULL
    : COLLISION_CODE_TRAPDOOR_BOTTOM;
}

function encodeSlabCollision(block) {
  if (getBooleanBlockState(block, [
    "minecraft:doubled",
    "doubled",
    "complementary:doubled"
  ])) {
    return COLLISION_CODE_FULL;
  }

  return getVerticalHalfState(block) === "top"
    ? COLLISION_CODE_FULL
    : COLLISION_CODE_SLAB_BOTTOM;
}

function encodeStairCollision(block) {
  if (getVerticalHalfState(block) === "top") {
    return COLLISION_CODE_FULL;
  }

  const direction = getCardinalDirectionIndex(block);
  const shape = getStairShapeIndex(block);
  return COLLISION_CODE_STAIR_BASE + (direction * COLLISION_STAIR_SHAPE_COUNT) + shape;
}

function getSnowLayerCount(block) {
  const stateValue = Number(getFirstDefinedBlockState(block, [
    "minecraft:height",
    "height",
    "minecraft:snow_height",
    "snow_height"
  ]));

  if (!Number.isFinite(stateValue)) {
    return 0;
  }

  return Math.max(1, Math.min(8, Math.round(stateValue)));
}

function getVerticalHalfState(block) {
  const verticalHalf = getFirstDefinedBlockState(block, [
    "minecraft:vertical_half",
    "vertical_half"
  ]);
  if (verticalHalf !== undefined) {
    return `${verticalHalf}`;
  }

  if (getBooleanBlockState(block, [
    "minecraft:upside_down_bit",
    "upside_down_bit",
    "minecraft:top_slot_bit",
    "top_slot_bit"
  ])) {
    return "top";
  }

  return "bottom";
}

function getCardinalDirectionIndex(block) {
  const direction = `${getFirstDefinedBlockState(block, [
    "minecraft:cardinal_direction",
    "cardinal_direction"
  ]) ?? ""}`;

  if (direction === "west") {
    return 3;
  }

  if (direction === "north") {
    return 0;
  }

  if (direction === "east") {
    return 1;
  }

  if (direction === "south") {
    return 2;
  }

  const weirdoDirection = Number(getFirstDefinedBlockState(block, [
    "minecraft:weirdo_direction",
    "weirdo_direction"
  ]));

  if (weirdoDirection === 0) {
    return 1;
  }

  if (weirdoDirection === 1) {
    return 3;
  }

  if (weirdoDirection === 2) {
    return 0;
  }

  if (weirdoDirection === 3) {
    return 2;
  }

  const facingDirection = Number(getFirstDefinedBlockState(block, [
    "minecraft:facing_direction",
    "facing_direction"
  ]));

  if (facingDirection === 2) {
    return 0;
  }

  if (facingDirection === 3) {
    return 2;
  }

  if (facingDirection === 4) {
    return 3;
  }

  if (facingDirection === 5) {
    return 1;
  }

  return 2;
}

function getStairShapeIndex(block) {
  const cornerState = `${getFirstDefinedBlockState(block, [
    "minecraft:corner",
    "corner"
  ]) ?? "none"}`;

  if (cornerState === "outer_left") {
    return 1;
  }

  if (cornerState === "outer_right") {
    return 2;
  }

  if (cornerState === "inner_left") {
    return 3;
  }

  if (cornerState === "inner_right") {
    return 4;
  }

  return 0;
}

function isAirLikeBlock(block) {
  const typeId = block?.typeId;
  return block?.isAir || typeId === "minecraft:air" ||
    typeId === "minecraft:cave_air" ||
    typeId === "minecraft:void_air";
}

function isLiquidLikeBlock(block) {
  const typeId = block?.typeId;
  return block?.isLiquid || typeId === "minecraft:water" ||
    typeId === "minecraft:flowing_water" ||
    typeId === "minecraft:lava" ||
    typeId === "minecraft:flowing_lava";
}

function isRailBlock(block) {
  try {
    return block?.hasTag("rail") === true;
  } catch {
    return false;
  }
}

function getBlockName(typeId) {
  return `${typeId ?? ""}`.split(":")[1] ?? "";
}

function isStairBlockName(blockName) {
  return blockName.endsWith("stairs");
}

function isSlabBlockName(blockName) {
  return blockName.includes("slab");
}

function isTrapdoorBlockName(blockName) {
  return blockName.endsWith("trapdoor");
}

function isCarpetBlockName(blockName) {
  return blockName.includes("carpet");
}

function isSnowLayerBlockName(blockName) {
  return blockName === "snow_layer" || blockName === "snow";
}

function isPressurePlateBlockName(blockName) {
  return blockName.includes("pressure_plate");
}

function isPathBlockName(blockName) {
  return blockName === "dirt_path" ||
    blockName === "grass_path" ||
    blockName.endsWith("_path");
}

function isDefinitelyNonSupportingBlock(blockName) {
  return blockName.endsWith("torch") ||
    blockName.endsWith("lantern") ||
    blockName.endsWith("_door") ||
    blockName.endsWith("ladder") ||
    blockName.endsWith("_sign") ||
    blockName.endsWith("_hanging_sign") ||
    blockName.endsWith("_banner") ||
    blockName.endsWith("_button") ||
    blockName === "lever" ||
    blockName.endsWith("_head") ||
    blockName.endsWith("_skull") ||
    blockName === "end_rod" ||
    blockName.endsWith("chain") ||
    blockName.endsWith("bars") ||
    blockName.endsWith("_pane") ||
    blockName === "glass_pane" ||
    blockName.endsWith("bell") ||
    blockName.endsWith("fence_gate") ||
    blockName.endsWith("grass") ||
    blockName.endsWith("fern") ||
    blockName.endsWith("bush") ||
    blockName.endsWith("flower") ||
    blockName.endsWith("sapling") ||
    blockName.endsWith("roots") ||
    blockName.endsWith("mushroom") ||
    blockName.endsWith("vine") ||
    blockName.endsWith("seagrass") ||
    blockName.endsWith("kelp") ||
    blockName.endsWith("coral") ||
    blockName.endsWith("candle");
}

function getBooleanBlockState(block, stateNames) {
  const stateValue = getFirstDefinedBlockState(block, stateNames);
  return stateValue === true || stateValue === 1 || stateValue === "true";
}

function getFirstDefinedBlockState(block, stateNames) {
  for (const stateName of stateNames) {
    const stateValue = getBlockState(block, stateName);
    if (stateValue !== undefined) {
      return stateValue;
    }
  }

  return undefined;
}

function getBlockState(block, stateName) {
  try {
    return block?.permutation?.getState(stateName);
  } catch {
    return undefined;
  }
}

function buildBasisFromDirection(direction, rotation) {
  const forward = normalizeVec(direction);
  if (lengthSq(forward) < 0.000001) {
    return buildBasisFromRotation(rotation);
  }

  let right = crossVec({ x: 0, y: 1, z: 0 }, forward);
  if (lengthSq(right) < 0.000001) {
    right = buildYawRight(rotation.yaw);
  }

  right = normalizeVec(right);
  let up = normalizeVec(crossVec(forward, right));
  const rollRadians = degreesToRadians(-rotation.roll);
  if (Math.abs(rollRadians) > 0.000001) {
    right = rotateAroundAxis(right, forward, rollRadians);
    up = rotateAroundAxis(up, forward, rollRadians);
  }

  return {
    forward,
    right: normalizeVec(right),
    up: normalizeVec(up)
  };
}

function buildBasisFromRotation(rotation) {
  const pitch = degreesToRadians(rotation.pitch);
  const yaw = degreesToRadians(rotation.yaw);
  const cosPitch = Math.cos(pitch);
  const forward = {
    x: -Math.sin(yaw) * cosPitch,
    y: -Math.sin(pitch),
    z: Math.cos(yaw) * cosPitch
  };

  return buildBasisFromDirection(forward, rotation);
}

function rotateAroundAxis(vector, axis, radians) {
  const normalizedAxis = normalizeVec(axis);
  const cosTheta = Math.cos(radians);
  const sinTheta = Math.sin(radians);
  const dot = dotVec(normalizedAxis, vector);
  const cross = crossVec(normalizedAxis, vector);

  return {
    x: vector.x * cosTheta + cross.x * sinTheta + normalizedAxis.x * dot * (1 - cosTheta),
    y: vector.y * cosTheta + cross.y * sinTheta + normalizedAxis.y * dot * (1 - cosTheta),
    z: vector.z * cosTheta + cross.z * sinTheta + normalizedAxis.z * dot * (1 - cosTheta)
  };
}

function buildYawRight(yawDegrees) {
  const yaw = degreesToRadians(yawDegrees);
  return {
    x: Math.cos(yaw),
    y: 0,
    z: Math.sin(yaw)
  };
}

function normalizeSubtitleTextInput(text, fallback) {
  const normalized = normalizeSubtitleTextInputValue(text);
  return isRenderableSubtitleTextInput(normalized)
    ? normalized
    : normalizeSubtitleTextInputValue(fallback);
}

function normalizeSubtitleTextInputValue(text) {
  if (typeof text === "string") {
    return decodeSubtitleTextFormatting(text.replace(/\r/g, ""));
  }

  if (!isMisideTextContentObject(text)) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.textType);
  }

  return normalizeMisideTextContent(text);
}

function isMisideTextContentObject(value) {
  return !!value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("segments" in value);
}

function normalizeMisideTextContent(value) {
  const keys = Object.keys(value);
  if (keys.length !== 1 || keys[0] !== "segments") {
    throw createLocalizedError(LOCALIZATION_KEYS.error.contentSegmentsOnly);
  }

  if (!Array.isArray(value.segments)) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.contentSegmentsArray);
  }

  return {
    segments: value.segments.map((entry) => normalizeMisideTextSegment(entry))
  };
}

function normalizeMisideTextSegment(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.contentSegmentEntry);
  }

  const keys = Object.keys(entry);
  if (!keys.includes("text") ||
    keys.some((key) => key !== "text" && key !== "color") ||
    typeof entry.text !== "string") {
    throw createLocalizedError(LOCALIZATION_KEYS.error.contentSegmentEntry);
  }

  const normalized = {
    text: decodeSubtitleTextFormatting(entry.text.replace(/\r/g, ""))
  };

  if ("color" in entry) {
    normalized.color = normalizeMisideTextColor(entry.color);
  }

  return normalized;
}

function normalizeMisideTextColor(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.colorObject);
  }

  const keys = Object.keys(value);
  if (keys.length !== 3 ||
    !keys.includes("red") ||
    !keys.includes("green") ||
    !keys.includes("blue")) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.colorObject);
  }

  return {
    red: normalizeMisideTextColorChannel(value.red, "red"),
    green: normalizeMisideTextColorChannel(value.green, "green"),
    blue: normalizeMisideTextColorChannel(value.blue, "blue")
  };
}

function normalizeMisideTextColorChannel(value, name) {
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    throw createLocalizedError(LOCALIZATION_KEYS.error.colorChannelRange, [name]);
  }

  return value;
}

function cloneSubtitleTextInput(text) {
  if (typeof text === "string") {
    return text;
  }

  return {
    segments: text.segments.map((entry) => ({
      text: entry.text,
      ...(entry.color
        ? {
          color: {
            red: entry.color.red,
            green: entry.color.green,
            blue: entry.color.blue
          }
        }
        : {})
    }))
  };
}

function isRenderableSubtitleTextInput(text) {
  const plainText = extractVisibleSubtitlePlainText(text).replace(/\n/g, "");
  return plainText.trim().length > 0;
}

function extractVisibleSubtitlePlainText(text) {
  let plainText = "";

  for (const segment of iterateSubtitleTextSegments(text)) {
    plainText += stripSubtitleFormattingCodes(segment);
  }

  return plainText;
}

function *iterateSubtitleTextSegments(text) {
  if (typeof text === "string") {
    yield text;
    return;
  }

  for (const entry of text.segments) {
    yield entry.text;
  }
}

function decodeSubtitleTextFormatting(text) {
  let result = "";

  for (let index = 0; index < text.length; index += 1) {
    const char = text.charAt(index);
    if (char === "/" && index + 1 < text.length) {
      const next = text.charAt(index + 1);
      if (next === "/") {
        result += "/";
        index += 1;
        continue;
      }

      if (next === "n") {
        result += "\n";
        index += 1;
        continue;
      }
    }

    if (char !== "&" || index + 1 >= text.length) {
      result += char;
      continue;
    }

    const next = text.charAt(index + 1);
    if (next === "&") {
      result += "&";
      index += 1;
      continue;
    }

    const code = next.toLowerCase();
    if (isKnownSubtitleFormattingCode(code)) {
      result += `§${code}`;
      index += 1;
      continue;
    }

    result += char;
  }

  return result;
}

function stripSubtitleFormattingCodes(text) {
  let result = "";

  for (let index = 0; index < text.length; index += 1) {
    if (text.charAt(index) !== "§" || index + 1 >= text.length) {
      result += text.charAt(index);
      continue;
    }

    const code = text.charAt(index + 1).toLowerCase();
    if (isKnownSubtitleFormattingCode(code)) {
      index += 1;
      continue;
    }

    result += text.charAt(index);
  }

  return result;
}

function buildStyledSubtitleLines(text) {
  const lines = [[]];
  let activeColor = DEFAULT_TEXT_COLOR;

  if (typeof text === "string") {
    appendStyledSubtitleSegment(lines, text, activeColor);
    return lines;
  }

  for (const segment of text.segments) {
    const segmentColor = segment.color ?? activeColor;
    activeColor = appendStyledSubtitleSegment(lines, segment.text, segmentColor);
  }

  return lines;
}

function appendStyledSubtitleSegment(lines, text, initialColor) {
  let activeColor = initialColor;

  for (let index = 0; index < text.length;) {
    const formattingCode = tryConsumeSubtitleFormattingCode(text, index);
    if (formattingCode) {
      activeColor = resolveSubtitleFormattingColor(formattingCode, activeColor);
      index += 2;
      continue;
    }

    const codePoint = text.codePointAt(index) ?? 0;
    const char = String.fromCodePoint(codePoint);
    index += char.length;

    if (char === "\n") {
      lines.push([]);
      continue;
    }

    lines[lines.length - 1].push({
      char,
      color: activeColor
    });
  }

  return activeColor;
}

function tryConsumeSubtitleFormattingCode(text, index) {
  if (text.charAt(index) !== "§" || index + 1 >= text.length) {
    return null;
  }

  const code = text.charAt(index + 1).toLowerCase();
  return isKnownSubtitleFormattingCode(code) ? code : null;
}

function isKnownSubtitleFormattingCode(code) {
  return code === "r" ||
    code in BEDROCK_TEXT_COLORS ||
    BEDROCK_TEXT_EFFECT_CODES.has(code);
}

function resolveSubtitleFormattingColor(code, currentColor) {
  if (code === "r") {
    return DEFAULT_TEXT_COLOR;
  }

  return BEDROCK_TEXT_COLORS[code] ?? currentColor;
}

function normalizeLocation(location) {
  return {
    x: normalizeNumber(location?.x, 0),
    y: normalizeNumber(location?.y, 0),
    z: normalizeNumber(location?.z, 0)
  };
}

function normalizeVec3(vector) {
  return normalizeLocation(vector);
}

function normalizeRotation(rotation) {
  return {
    x: normalizeNumber(rotation?.x, 0),
    y: normalizeNumber(rotation?.y, 0),
    z: normalizeNumber(rotation?.z, 0)
  };
}

function toBaseRotation(rotation = null) {
  return {
    pitch: normalizeNumber(rotation?.x, 0),
    yaw: normalizeNumber(rotation?.y, 0),
    roll: normalizeNumber(rotation?.z, 0)
  };
}

function cloneRotation(rotation) {
  return {
    x: rotation?.x ?? 0,
    y: rotation?.y ?? 0,
    z: rotation?.z ?? 0
  };
}

function normalizeOptionalDirection(direction) {
  if (!direction) {
    return null;
  }

  const normalized = normalizeLocation(direction);
  return lengthSq(normalized) < 0.000001 ? null : normalized;
}

function normalizeUseRotation(useRotation) {
  return useRotation === undefined ? DEFAULT_USE_ROTATION : !!useRotation;
}

function normalizeDepthTest(depthTest) {
  return depthTest === undefined ? DEFAULT_DEPTH_TEST : !!depthTest;
}

function normalizeBackfaceVisible(backfaceVisible) {
  return backfaceVisible === undefined ? DEFAULT_BACKFACE_VISIBLE : !!backfaceVisible;
}

function normalizeGlow(glow) {
  return glow === undefined ? DEFAULT_GLOW : !!glow;
}

function hasRotationFacingOverride(rotation) {
  if (!rotation || typeof rotation !== "object") {
    return false;
  }

  return rotation.x !== undefined || rotation.y !== undefined;
}

function normalizeScale(scale) {
  const parsed = Number.parseFloat(`${scale ?? DEFAULT_SCALE}`);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_SCALE;
  }

  return parsed;
}

function normalizeDuration(value, fallback) {
  const parsed = Number.parseFloat(`${value ?? fallback}`);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function normalizeOptionalDuration(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const parsed = Number.parseFloat(`${value}`);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

function normalizeNumber(value, fallback) {
  const parsed = Number.parseFloat(`${value ?? ""}`);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizePositiveNumber(value, fallback) {
  const parsed = normalizeNumber(value, fallback);
  return parsed > 0 ? parsed : fallback;
}

function normalizeNonNegativeNumber(value, fallback) {
  const parsed = normalizeNumber(value, fallback);
  return parsed >= 0 ? parsed : fallback;
}

function secondsToTicks(seconds) {
  return Math.max(0, seconds * 20);
}

function ticksToSeconds(ticks) {
  return Math.max(0, ticks) / 20;
}

function countSubtitleSlots(text) {
  return buildStyledSubtitleLines(text)
    .reduce((count, line) => count + line.length, 0);
}

function getDefaultFadeInTicks(totalSlots) {
  if (totalSlots <= 0) {
    return 0;
  }

  return Math.max(0, (totalSlots - 1) * MAIN_CHAR_INTERVAL) + MAIN_CHAR_POP_TICKS;
}

function resolveFadeInDurationSeconds(totalSlots, fadeInDuration) {
  return fadeInDuration ?? ticksToSeconds(getDefaultFadeInTicks(totalSlots));
}

function resolveStageTimings(totalSlots, options = {}) {
  const safeTotalSlots = Math.max(0, Math.round(totalSlots));
  const fadeInDuration = resolveFadeInDurationSeconds(safeTotalSlots, options.fadeInDuration ?? null);
  const fadeInTicks = secondsToTicks(fadeInDuration);
  let fadeInCharIntervalTicks = 0;
  let fadeInCharPopTicks = fadeInTicks;

  if (safeTotalSlots > 1 && fadeInTicks > 0) {
    fadeInCharIntervalTicks = fadeInTicks / (safeTotalSlots + 1);
    fadeInCharPopTicks = Math.max(0, fadeInTicks - (fadeInCharIntervalTicks * (safeTotalSlots - 1)));
  }

  return {
    fadeInTicks,
    fadeInCharIntervalTicks,
    fadeInCharPopTicks,
    holdTicks: secondsToTicks(normalizeDuration(options.holdDuration, DEFAULT_HOLD_DURATION)),
    restTicks: secondsToTicks(normalizeDuration(options.restDuration, DEFAULT_REST_DURATION)),
    fadeOutTicks: secondsToTicks(normalizeDuration(options.fadeOutDuration, DEFAULT_FADE_OUT_DURATION))
  };
}

function applyEffectStageTimings(effect, totalSlots, options = {}) {
  const stageTimings = resolveStageTimings(totalSlots, options);
  effect.fadeInTicks = stageTimings.fadeInTicks;
  effect.fadeInCharIntervalTicks = stageTimings.fadeInCharIntervalTicks;
  effect.fadeInCharPopTicks = stageTimings.fadeInCharPopTicks;
  effect.holdTicks = stageTimings.holdTicks;
  effect.restTicks = stageTimings.restTicks;
  effect.fadeOutTicks = stageTimings.fadeOutTicks;
}

function cloneVec(vector) {
  return {
    x: vector?.x ?? 0,
    y: vector?.y ?? 0,
    z: vector?.z ?? 0
  };
}

function normalizeVec(vector) {
  const length = Math.sqrt(lengthSq(vector));
  return length < 0.000001 ? zeroVec() : scaleVec(vector, 1 / length);
}

function addVec(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  };
}

function scaleVec(vector, scalar) {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: vector.z * scalar
  };
}

function crossVec(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

function dotVec(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function zeroVec() {
  return { x: 0, y: 0, z: 0 };
}

function lengthSq(vector) {
  return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
}

function degreesToRadians(value) {
  return value * Math.PI / 180;
}

function formatFloat(value) {
  return Number.isFinite(value) ? value.toFixed(6) : "0";
}

function getVecSignature(vector) {
  return `${formatFloat(vector.x)}|${formatFloat(vector.y)}|${formatFloat(vector.z)}`;
}

function removeEntity(entity) {
  if (entity?.isValid) {
    entity.remove();
  }
}

function createLocalizedCommandResult(origin, status, messageKey, messageArgs = []) {
  sendLocalizedCommandMessage(origin, messageKey, messageArgs);
  return {
    status
  };
}

function sendLocalizedCommandMessage(origin, messageKey, messageArgs = []) {
  const feedbackTarget = origin?.sourceEntity;
  if (!feedbackTarget?.isValid || typeof feedbackTarget.sendMessage !== "function") {
    return false;
  }

  try {
    feedbackTarget.sendMessage(buildTranslatedRawMessage(messageKey, messageArgs));
    return true;
  } catch {
    return false;
  }
}

function buildTranslatedRawMessage(messageKey, messageArgs = []) {
  if (!Array.isArray(messageArgs) || messageArgs.length === 0) {
    return {
      translate: messageKey
    };
  }

  const usesOnlyStrings = messageArgs.every((arg) => typeof arg === "string");
  return {
    translate: messageKey,
    with: usesOnlyStrings
      ? messageArgs
      : { rawtext: messageArgs.map((arg) => normalizeTranslatedTextArgument(arg)) }
  };
}

function createTranslatedTextArgument(translate) {
  return { translate };
}

function normalizeTranslatedTextArgument(arg) {
  if (typeof arg === "string") {
    return { text: arg };
  }

  if (arg && typeof arg === "object" && !Array.isArray(arg)) {
    if (typeof arg.translate === "string") {
      return { translate: arg.translate };
    }

    if (typeof arg.text === "string") {
      return { text: arg.text };
    }
  }

  return { text: `${arg ?? ""}` };
}

function resolveCommandParameterTextArgument(label) {
  if (label === "timings") {
    return createTranslatedTextArgument(LOCALIZATION_KEYS.parameter.timings);
  }

  if (label === "renderFlags") {
    return createTranslatedTextArgument(LOCALIZATION_KEYS.parameter.renderFlags);
  }

  return `${label ?? ""}`;
}

function createLocalizedError(messageKey, messageArgs = []) {
  return new Error(formatLocalizedErrorMessage(messageKey, messageArgs));
}

function formatLocalizedErrorMessage(messageKey, messageArgs = []) {
  if (!Array.isArray(messageArgs) || messageArgs.length === 0) {
    return messageKey;
  }

  return `${messageKey}:${messageArgs.map((arg) => `${arg ?? ""}`).join(",")}`;
}
