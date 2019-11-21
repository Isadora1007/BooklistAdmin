using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BooklistAdmin.Models;

namespace BooklistAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly booklistDBContext _context;

        public BooksController(booklistDBContext context)
        {
            _context = context;
        }

        //GET:api/Books
        [HttpGet]
        public IEnumerable<BookModel> GetBooks()
        {

            var resultList = from bk in _context.Book
                             join blb in _context.BooklistBook on bk.BookId equals blb.BookId
                             join bl in _context.Booklist on blb.BooklistId equals bl.BooklistId
                             join dp in _context.Display on bl.BooklistId equals dp.BooklistId
                             select new BookModel
                             {
                                 BookId = bk.BookId,
                                 LayoutId = dp.LayoutId,
                                 BooklistId = bl.BooklistId,
                                 Isbn = bk.Isbn,
                                 Callnumber = bk.Callnumber,
                                 Title = bk.Title,
                                 Subtitle = bk.Subtitle,
                                 Author = bk.Author,
                                 Bookcoverurl = bk.Bookcoverurl,
                                 Type = bk.Type,
                                 Page = bk.Page,
                                 Annotation = bk.Annotation,
                                 Jacketheight = bk.Jacketheight,
                                 Jacketwidth = bk.Jacketwidth
                             };


            return resultList.Where(bk => bk.Jacketheight > bk.Jacketwidth).ToList();
            
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        // public async Task<ActionResult<IEnumerable<BookModel>>> GetBook(int id)
        public IEnumerable<BookModel> GetBooks(int id)
        {

            //id should be layoutId
            
            var resultList = from bk in _context.Book
                             join blb in _context.BooklistBook on bk.BookId equals blb.BookId
                             join bl in _context.Booklist on blb.BooklistId equals bl.BooklistId
                             join dp in _context.Display on bl.BooklistId equals dp.BooklistId
                             where dp.LayoutId == id
                             select new BookModel
                             {
                                 BookId = bk.BookId,
                                 LayoutId = dp.LayoutId,
                                 BooklistId = bl.BooklistId,
                                 Isbn = bk.Isbn,
                                 Callnumber = bk.Callnumber,
                                 Title = bk.Title,
                                 Subtitle = bk.Subtitle,
                                 Author = bk.Author,
                                 Bookcoverurl = bk.Bookcoverurl,
                                 Type = bk.Type,
                                 Page = bk.Page,
                                 Annotation = bk.Annotation,
                                 Jacketheight = bk.Jacketheight,
                                 Jacketwidth = bk.Jacketwidth
                             };

           
            List<BookModel> bookModelList = resultList.Where(bk => bk.Jacketheight > bk.Jacketwidth).ToList();
          
            return bookModelList;
        }

    }
}