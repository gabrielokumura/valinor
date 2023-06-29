import { Component, OnInit } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.css']
})
export class RepoListComponent implements OnInit {
  repos: any[] = [];
  currentPage: number = 1; // Página atual

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.loadRepos();
  }

  loadRepos() {
    this.githubService.getRepos(this.currentPage).subscribe((data: any) => {
      this.repos = data?.items || [];
    });
  }
  

  nextPage() {
    this.currentPage++;
    this.loadRepos();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepos();
    }
  }
}
