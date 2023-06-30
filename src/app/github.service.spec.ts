import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the list of repositories', () => {
    const mockRepos = [
      { id: 1, name: 'repo1', description: 'Repository 1' },
      { id: 2, name: 'repo2', description: 'Repository 2' },
      { id: 3, name: 'repo3', description: 'Repository 3' }
    ];

    service.getRepos(1, 10).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne('https://api.github.com/search/repositories?q=node&page=1&per_page=5');
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockRepos });
  });
});
