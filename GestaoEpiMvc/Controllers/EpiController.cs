using Microsoft.AspNetCore.Mvc;
using GestaoEpiMvc.Models;
using System.Text.Json;

namespace GestaoEpiMvc.Controllers
{
    public class EpiController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public EpiController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        // GET: Epi
        public async Task<IActionResult> Index()
        {
            var httpClient = _httpClientFactory.CreateClient("GestaoEpiApi");
            var response = await httpClient.GetAsync("api/Epis");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var epis = JsonSerializer.Deserialize<IEnumerable<EpiViewModel>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                return View(epis);
            }
            else
            {
                // Tratar erro, talvez redirecionar para uma página de erro
                return View("Error");
            }
        }

        // GET: Epi/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var httpClient = _httpClientFactory.CreateClient("GestaoEpiApi");
            var response = await httpClient.GetAsync($"api/Epis/{id}");

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var epi = JsonSerializer.Deserialize<EpiViewModel>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                if (epi == null)
                {
                    return NotFound();
                }
                return View(epi);
            }
            else
            {
                return View("Error");
            }
        }

        // Métodos para Create, Edit, Delete seriam adicionados aqui, chamando os respectivos endpoints da API
    }
}
