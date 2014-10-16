_.templateSettings.interpolate = /{([\s\S]+?)}/g;

function RepoRedo(githubUsername){
	this.username = githubUsername;

	this.init();
}

RepoRedo.prototype.getUserInfo = function(){
	return $.get('https://api.github.com/users/' + this.username).then(function(data){
		return data;
	});
};





RepoRedo.prototype.loadTemplateFile = function(templateName){
	return $.get('./templates/' + templateName + '.html').then(function(htmlstring){
		return htmlstring;
	});
};


RepoRedo.prototype.putProfileDataOnPage = function(profileHtml, profile){
	var d = new Date(profile.created_at);
	profile.joined = ["Joined on ", d.toDateString()].join("");
	document.querySelector('left-column').innerHTML = _.template(profileHtml, profile);

};




RepoRedo.prototype.init = function(){
	var self = this;

	$.when(
		this.getUserInfo(),
		this.loadTemplateFile('profile')
		//this.loadTemplateFile('repo')

		).then(function(profile, repos, profileHtml, repoHtml){
			self.putProfileDataOnPage(profileHtml, profile)
		//	self.putRepoDataOnPage(repoHtml, repos)
		})
};

window.onload = app;

function app(){
	var myRepo = new RepoRedo('abergen84');
}