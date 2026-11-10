/**
 * dsh-plugin-whale — node half.
 *
 * The whole UI ships through exports["./client"]; this half only declares the
 * plugin's config schema, which the client exposes to the browser as a config
 * form keyed by the loader entry id ("dsh-plugin-whale").
 * The browser half reads/writes those two fields through ctx.configForms.
 */
import z from '@deepseek-ai/schemastery';

/** Mark a field live-applying when the host's schemastery supports it. */
const live = (schema) => (typeof schema.volatile === 'function' ? schema.volatile() : schema);

/** Live config: both fields apply without a restart where supported. */
export const Config = z.object({
  whaleScale: live(z.number().step(0.05).min(0.7).max(1.4).default(1)),
  alertThreshold: live(z.number().step(0.5).min(0).max(10000).default(30)),
  greenBrightness: live(z.number().step(0.05).min(0.6).max(2.4).default(1.3)),
  // 消遣模式里零食向右漂的速度倍率（1.0× = 22 单位/秒）
  snackSpeed: live(z.number().step(0.1).min(0.5).max(2).default(1)),
  showDiagnostics: live(z.boolean().default(true)),
  // 'line' = 线稿（只描边）；'fill' = 填色（实心鲸鱼 + 底色留白）
  whaleStyle: live(z.string().default('line')),
});

/** Loader entry id — the browser half resolves the same config form by this id. */
export const ENTRY_ID = 'dsh-plugin-whale';

/**
 * Keep the plugin's own settings rows (rendered by the browser half) and opt
 * out of the generic auto-generated form for this entry.
 * @param ctx - host context.
 */
export function apply(ctx) {
  ctx.inject(['settings'], (child) => {
    try {
      child.effect(() => child.settings.configure({ auto: false }, ctx.fiber));
    } catch {
      // Hosts without settings.configure have nothing to opt out of.
    }
  });
}
