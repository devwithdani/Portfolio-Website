export type Journey = { scene: number; step: number };
export const introWords = ['AI.', 'Code.', 'Design.', 'Klare taal.'];
export function advanceJourney(current: Journey, direction: number): Journey {
 const delta = Math.sign(direction);
 if (!delta) return current;
 if (current.scene === 0) {
  if (delta > 0 && current.step < 3) return {scene:0, step:current.step+1};
  if (delta < 0) return {scene:0, step:Math.max(0,current.step-1)};
  return {scene:1, step:0};
 }
 if (current.scene === 1 && delta < 0) return {scene:0, step:3};
 return {scene:Math.max(0,Math.min(3,current.scene+delta)),step:0};
}
