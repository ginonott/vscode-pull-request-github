import * as assert from 'assert';
import { CredentialStore } from '../../github/credentials';
import { GitHubRepository } from '../../github/githubRepository';
import { PullRequestModel } from '../../github/pullRequestModel';
import { PullRequestStateEnum } from '../../github/interface';
import { Protocol } from '../../common/protocol';
import { Remote } from '../../common/remote';

const telemetry = {
	on: (action) => Promise.resolve(),
	shutdown: () => Promise.resolve()
};
const credentials = new CredentialStore(telemetry);
const protocol = new Protocol('');
const remote = new Remote('test', 'github/test', protocol);
const repo = new GitHubRepository(remote, credentials);
const user = {
	login: 'me',
	id: 1,
	node_id: 'string',
	avatar_url: '',
	gravatar_id: '',
	url: '',
	html_url: '',
	followers_url: '',
	following_url: '',
	gists_url: '',
	starred_url: '',
	subscriptions_url: '',
	organizations_url: '',
	repos_url: '',
	events_url: '',
	received_events_url: '',
	type: '',
	site_admin: false,
};
const githubRepo = {
	id: 1,
	node_id: '',
	name: '',
	full_name: '',
	owner: user,
	private: false,
	html_url: '',
	description: '',
	fork: false,
	url: '',
	archive_url: '',
	assignees_url: '',
	blobs_url: '',
	branches_url: '',
	collaborators_url: '',
	comments_url: '',
	commits_url: '',
	compare_url: '',
	contents_url: '',
	contributors_url: '',
	deployments_url: '',
	downloads_url: '',
	events_url: '',
	forks_url: '',
	git_commits_url: '',
	git_refs_url: '',
	git_tags_url: '',
	git_url: '',
	issue_comment_url: '',
	issue_events_url: '',
	issues_url: '',
	keys_url: '',
	labels_url: '',
	languages_url: '',
	merges_url: '',
	milestones_url: '',
	notifications_url: '',
	pulls_url: '',
	releases_url: '',
	ssh_url: '',
	stargazers_url: '',
	statuses_url: '',
	subscribers_url: '',
	subscription_url: '',
	tags_url: '',
	teams_url: '',
	trees_url: '',
	clone_url: '',
	mirror_url: '',
	hooks_url: '',
	svn_url: '',
	homepage: '',
	language: null,
	forks_count: 0,
	stargazers_count: 0,
	watchers_count: 0,
	size: 1,
	default_branch: 'master',
	open_issues_count: 0,
	topics: [],
	has_issues: false,
	has_projects: false,
	has_wiki: false,
	has_pages: false,
	has_downloads: false,
	archived: false,
	pushed_at: '',
	created_at: '',
	updated_at: '',
	permissions: {
		admin: false,
		push: true,
		pull: true,
	},
	allow_rebase_merge: true,
	allow_squash_merge: true,
	allow_merge_commit: false,
	subscribers_count: 0,
	network_count: 0,
};
const pr = {
	number: 1,
	body: 'My PR body.',
	labels: [],
	title: 'My PR title.',
	html_url: '',
	user,
	state: 'open' as 'open',
	merged: false,
	assignee: user,
	created_at: '',
	updated_at: '',
	comments: 0,
	commits: 1,
	head: {
		label: '',
		ref: '',
		repo: githubRepo,
		sha: '',
		user,
	},
	base: {
		label: '',
		ref: '',
		repo: githubRepo,
		sha: '',
		user,
	},
	mergeable: true
};

describe('PullRequestModel', () => {
	it('should return `state` properly as `open`', () => {
		const open = new PullRequestModel(repo, remote, pr);

		assert.equal(open.state, PullRequestStateEnum.Open);
	});

	it('should return `state` properly as `closed`', () => {
		const open = new PullRequestModel(repo, remote, { ...pr, state: 'closed' });

		assert.equal(open.state, PullRequestStateEnum.Closed);
	});

	it('should return `state` properly as `merged`', () => {
		const open = new PullRequestModel(repo, remote, { ...pr, merged: true, state: 'closed' });

		assert.equal(open.state, PullRequestStateEnum.Merged);
	});
});
