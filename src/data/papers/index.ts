import paper1 from './paper1'
import paper2 from './paper2'
import paper3 from './paper3'
import type { Paper } from '../schema'

export const papers: Paper[] = [paper1, paper2, paper3]

export function getPaperById(id: string): Paper | undefined {
  return papers.find((p) => p.id === id)
}
