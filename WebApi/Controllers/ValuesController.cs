﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly string key = "";
        private readonly string channel = "ASPWorldTour";

        [HttpGet]
        public ActionResult Get()
        {
            var youTubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = key
            });

            var channelsListRequest = youTubeService.Channels.List("contentDetails");
            channelsListRequest.ForUsername = channel;
            var channelsListResponse = channelsListRequest.Execute();
            int VideoCount = 1;
            foreach (var channel in channelsListResponse.Items)
            {
                var uploadsListId = channel.ContentDetails.RelatedPlaylists.Uploads;
                var nextPageToken = "";
                while (!string.IsNullOrEmpty(nextPageToken))
                {
                    var playlistItemsListRequest = youTubeService.PlaylistItems.List("snippet");
                    playlistItemsListRequest.PlaylistId = uploadsListId;
                    playlistItemsListRequest.MaxResults = 50;
                    playlistItemsListRequest.PageToken = nextPageToken;

                    var playlistItemsListResponse = playlistItemsListRequest.Execute();
                    foreach (var playlistItem in playlistItemsListResponse.Items)
                    {
                        VideoCount++;
                    }
                    nextPageToken = playlistItemsListResponse.NextPageToken;
                    return Ok(playlistItemsListResponse.Items);
                }

            }
            return Ok(null);
        }


        [HttpGet("search/{search}")]
        public ActionResult Search(string search)
        {
            var youTubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = key
            });

            SearchResource.ListRequest listRequest = youTubeService.Search.List("snippet");
            listRequest.Q = search;
            listRequest.Order = SearchResource.ListRequest.OrderEnum.Relevance;

            SearchListResponse searchResponse = listRequest.Execute();

            List<dynamic> videos = new List<dynamic>();
            List<dynamic> channels = new List<dynamic>();
            List<dynamic> playlists = new List<dynamic>();
            List<dynamic> all = new List<dynamic>();

            foreach (SearchResult searchResult in searchResponse.Items)
            {
                switch (searchResult.Id.Kind)
                {
                    case "youtube#video":
                        videos.Add( new {Type =  "video",Title = searchResult.Snippet.Title , Id = searchResult.Id.VideoId });
                        all.Add( new {Type =  "video",Title = searchResult.Snippet.Title , Id = searchResult.Id.VideoId });
                        break;

                    case "youtube#channel":
                        channels.Add(new { Type = "canal", Title = searchResult.Snippet.Title, Id = searchResult.Id.ChannelId });
                        all.Add(new { Type = "canal", Title = searchResult.Snippet.Title, Id = searchResult.Id.ChannelId });
                        break;
                    case "youtube#playlist":
                        playlists.Add(new { Type = "playlist", Title = searchResult.Snippet.Title, Id = searchResult.Id.PlaylistId });
                        all.Add(new { Type = "playlist", Title = searchResult.Snippet.Title, Id = searchResult.Id.PlaylistId });

                        break;
                }
            }

            
            return Ok(all);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
