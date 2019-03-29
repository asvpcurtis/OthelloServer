using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OthelloServer.AI
{
    public enum Colour
    {
        Black,
        White,
        Neither
    }
    public class GameState
    {
        public readonly AIGameState AIState;

        public GameState()
        {
            AIState = new AIGameState();
        }
        public IEnumerable<ulong> GetLegalMoves()
        {
            return AIState.GetLegalMoves();
        }
        public Colour GetTurn()
        {
            if (AIState.IsGameOver())
            {
                return Colour.Neither;
            }
            else if (AIState.IsBlackTurn())
            {
                return Colour.Black;
            }
            else
            {
                return Colour.White;
            }
        }
    }
}
