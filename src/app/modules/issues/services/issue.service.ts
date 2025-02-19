import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getCommentIssueByNumber, getIssueByNumber } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issueNumber = signal<string | null>(null)

  issuesQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }))

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getCommentIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null
  }))

  setIssueNumber(issueId: string) {
    this.issueNumber.set(issueId)
  }
}
